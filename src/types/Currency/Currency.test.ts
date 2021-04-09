import CryptoCurrencies from '~types/CryptoCurrencies';
import FiatCurrencies from '~types/FiatCurrencies';
import Currency from './Currency';

describe('Currency', () => {
    it('creates an ADA currency instance', () => {
        const currency = new Currency(CryptoCurrencies.ADA);

        expect(currency.name).toBe('Cardano');
        expect(currency.symbol).toBe('ADA');
    });
})
