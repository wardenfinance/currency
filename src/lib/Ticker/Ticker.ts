import CryptoCurrencies from '../../types/CryptoCurrencies';
import FiatCurrencies from '../../types/FiatCurrencies';
import getCurrencySymbol from '../../utils/getCurrencySymbol';

type TickerConfig = {
    base: CryptoCurrencies | FiatCurrencies;
    quote: CryptoCurrencies | FiatCurrencies;
    frequency?: number;
    request: () => Promise<number>;
    onError?: (e: unknown) => void;
}

type TickerHistory = Array<{
    price: number;
    date: Date;
}>;

class Ticker {
    private readonly _baseName: string;
    private readonly _baseSymbol: string;

    private readonly _quoteName: string;
    private readonly _quoteSymbol: string;

    private readonly _frequency: number;
    private readonly _request: () => Promise<number>;
    private readonly _onError?: (e: unknown) => void;

    private _price: number | undefined = undefined;
    private _history: TickerHistory = [];

    private _interval: NodeJS.Timeout | undefined = undefined;
    private _fetching = false;

    constructor(config: TickerConfig) {
        const baseSymbol = getCurrencySymbol(config.base);
        if (!baseSymbol) throw new Error('Invalid base currency.');

        const quoteSymbol = getCurrencySymbol(config.quote);
        if (!quoteSymbol) throw new Error('Invalid quote currency.');

        this._baseName = config.base.toString();
        this._baseSymbol = baseSymbol;
        
        this._quoteName = config.quote.toString();
        this._quoteSymbol = quoteSymbol;

        this._frequency = config.frequency || 1000;
        this._request = config.request;
        this._onError = config.onError;
    }

    public get baseName(): string { return this._baseName; }
    public get baseSymbol(): string { return this._baseSymbol; }

    public get quoteName(): string { return this._quoteName; }
    public get quoteSymbol(): string { return this._quoteSymbol; }

    public get price(): number | undefined { return this._price; }
    public get history(): TickerHistory { return this._history; }

    public get active(): boolean { return this._interval !== undefined; }

    public update(): void {
        if (!this._fetching) {
            this._fetching = true;
            this._request()
                .then(price => {
                    this._price = price;
                    this._history.push({ price, date: new Date() });
                })
                .catch(this._onError)
                .finally(() => this._fetching = false);
        }
    }

    public start(): void {
        if (this._interval === undefined) {
            this._interval = setInterval(() => {
                this.update();
            }, this._frequency);
        }
    }

    public stop(): void {
        if (this._interval !== undefined) {
            clearTimeout(this._interval);
            this._interval = undefined;
        }
    }

    public reset(): void {
        this.stop();
        this._price = undefined;
        this._history = [];
    }
}

export default Ticker;
