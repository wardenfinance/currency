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
 * A ticker between a base and a quote currency that updates
 * at a specified interval using a provided request function.
 */
class Ticker {
    protected readonly request: () => Promise<number | undefined>;
    protected readonly options: TickerOptions;

    protected interval?: NodeJS.Timeout;

    protected _fetching: boolean = false;
    protected _history: TickerHistory = [];

    protected update(): void {
        if (!this._fetching) {
            this._fetching = true;
            this.request()
                .then(price => {
                    if (price) {
                        this.history.push({
                            price,
                            date: new Date()
                        });
                        if (this.options.onUpdate) this.options.onUpdate(price);
                    }
                })
                .catch(e => {
                    if (this.options.onError) this.options.onError(e);
                })
                .finally(() => {
                    this._fetching = false;
                });
        }
    }

    /**
     * Create a new ticker instance
     * @param base Base currency to use
     * @param quote Quote currency to use
     * @param request Implementation for retrieving prices
     * @param options Define additional options for the ticker
     */
    public constructor(
        base: CryptoCurrencies | FiatCurrencies,
        quote: CryptoCurrencies | FiatCurrencies,
        request: () => Promise<number | undefined>,
        options?: Partial<TickerOptions>
    ) {
        this.base = base;
        this.quote = quote;
        this.request = request;
        this.options = {
            refreshMs: 1000,
            ...options
        }
    }

    public readonly base: CryptoCurrencies | FiatCurrencies;
    public readonly quote: CryptoCurrencies | FiatCurrencies;

    get fetching() { return this._fetching; }
    get price() { return this._history[this._history.length - 1].price; }
    get history() { return this._history; }

    public start(): void {
        if (!this.interval) {
            this.interval = setInterval(this.update, this.options.refreshMs);
        }
    }

    public stop(): void {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = undefined;
        }
    }
}

export default Ticker;
export { TickerOptions, TickerHistory };
