import CryptoCurrencies from '~types/CryptoCurrencies';
import FiatCurrencies from '~types/FiatCurrencies';

type TickerOptions = {
    /**
     * Time in milliseconds to update the ticker
     */
    refreshMs: number;

    /**
     * Listen for updates
     */
    onUpdate?: (price: number) => void;

    /**
     * Listen for errors
     */
    onError?: (e: any) => void;
}

type TickerHistory = Array<{
    price: number;
    date: Date;
}>;

/**
 * A ticker between a cryptocurrency and a fiat currency that updates
 * at a specified interval using a provided request function.
 */
class Ticker {
    /**
     * Create a new ticker instance
     * @param crypto Cryptocurrency to use
     * @param fiat Fiat currency to use
     * @param request Implementation for retrieving prices
     * @param options Define additional options for the ticker
     */
    constructor(
        crypto: CryptoCurrencies,
        fiat: FiatCurrencies,
        request: () => Promise<number>,
        options?: Partial<TickerOptions>
    ) {
        this.crypto = crypto;
        this.fiat = fiat;
        this.request = request;
        this.options = {
            refreshMs: 1000,
            ...options
        }
    }

    private readonly crypto: CryptoCurrencies;
    private readonly fiat: FiatCurrencies;
    private readonly request: () => Promise<number>;
    private readonly options: TickerOptions;

    protected interval?: NodeJS.Timeout;

    protected _fetching: boolean = false;
    protected _price: number = 0;
    protected _history: Array<Record<number, Date>> = [];

    protected update(): void {
        if (!this._fetching) {
            this.request()
                .then(price => {
                    this._price = price;
                    if (this.options.onUpdate) this.options.onUpdate(price);
                })
                .catch(e => {
                    if (this.options.onError) this.options.onError(e);
                })
                .finally(() => {
                    this._fetching = false;
                });
        }
    }

    public start(): void {
        if (!this.interval) {
            this.interval = setInterval(() => {
                this.update();
            }, this.options.refreshMs);
        }
    }

    get fetching() { return this._fetching; }
    get price() { return this._price; }
    get history() { return this._history; }
}

export default Ticker;
export { TickerOptions, TickerHistory };