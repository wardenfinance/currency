import CryptoCurrencies from '~types/CryptoCurrencies';
import FiatCurrencies from '~types/FiatCurrencies';
import Ticker from '~lib/Ticker';

let ticker: Ticker;

describe('Ticker', () => {
    

    beforeAll(() => {
        ticker = new Ticker({
            base: CryptoCurrencies.BTC,
            quote: FiatCurrencies.USD,
            frequency: 1000,
            request: async () => Promise.resolve(1)
        });
    });

    beforeEach(() => {
        ticker.reset();
    });

    afterEach(() => {
        ticker.stop();
    })

    it('should have an undefined price', () => {
        expect(ticker.price).toBeUndefined();
    });

    it('should start the ticker, have a price of 1, and have a history length of 1 after 1000ms', async () => {
        ticker.start();
        const price = await new Promise(resolve => {
            setTimeout(() => resolve(ticker.price), 1000);
        });
        expect(price).toBe(1);
        expect(ticker.history.length).toBe(1);
    });
})
