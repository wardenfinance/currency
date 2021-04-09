import CryptoCurrencies from '../types/CryptoCurrencies';
import FiatCurrencies from '../types/FiatCurrencies';

function getCurrencySymbol(currency: CryptoCurrencies | FiatCurrencies): string | undefined {
    return Object.keys(CryptoCurrencies).find(key => {
        const crypto = CryptoCurrencies[key as keyof typeof CryptoCurrencies];
        if (currency === crypto) return key;
    }) || Object.keys(FiatCurrencies).find(key => {
        const fiat = FiatCurrencies[key as keyof typeof FiatCurrencies];
        if (currency === fiat) return key;
    });
}

export default getCurrencySymbol;
