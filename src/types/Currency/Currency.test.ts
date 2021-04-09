import CryptoCurrencies from '~types/CryptoCurrencies';
import FiatCurrencies from '~types/FiatCurrencies';
import Currency from './Currency';

describe('Currency', () => {
    it('creates a BTC currency instance', () => {
        const currency = new Currency(CryptoCurrencies.BTC);

        expect(currency.name).toBe('Bitcoin');
        expect(currency.symbol).toBe('BTC');
    });

    it('creates a USD currency instance', () => {
        const currency = new Currency(FiatCurrencies.USD);

        expect(currency.name).toBe('US Dollar');
        expect(currency.symbol).toBe('USD');
    });
})
