# currency
JavaScript library for utilizing fiat and crypto currencies.

![Version](https://img.shields.io/github/package-json/v/wardenfinance/currency)
![License](https://img.shields.io/github/license/wardenfinance/currency)
[![Node.js CI](https://github.com/wardenfinance/currency/actions/workflows/node.js.yml/badge.svg)](https://github.com/wardenfinance/currency/actions/workflows/node.js.yml)
[![CodeQL](https://github.com/wardenfinance/currency/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/wardenfinance/currency/actions/workflows/codeql-analysis.yml)

## Installation

Install _@wardenfinance/currency_ via **NPM**

```sh
npm install @wardenfinance/currency --save
```

Install _@wardenfinance/currency_ via **GitHub**
```sh
npm install https://github.com/wardenfinance/currency --save
```

## Usage

### Currency Enums

You can access enumerations of both cryptocurrencies and fiat currencies:

```typescript
import {
    CryptoCurrencies,
    FiatCurrencies
} from '@wardenfinance/currency';

const bitcoin = CryptoCurrencies.BTC; // "Bitcoin"
const btc = CryptoCurrencies[CryptoCurrencies.BTC]; // "BTC"

const usDollar = FiatCurrencies.USD; // "US Dollar"
const usd = FiatCurrencies[FiatCurrencies.USD]; // "USD"
```

### Tickers

If you provide your own implementation for fetching base/quote prices, you can use the Ticker class like so:

```typescript
import {
    CryptoCurrencies,
    FiatCurrencies,
    Ticker
} from '@wardenfinance/currency';

const btcUsdTicker = new Ticker({
    base: CryptoCurrencies.BTC,
    quote: FiatCurrencies.USD,
    frequency: 1000, // get current quote price every 1000 milliseconds
    request: () => {
        // ... some implementation to get current price
        return 50000.00;
    },
    onError: (e: unknown) => {
        console.error(e);
    }
});

btcUsdTicker.start();

setTimeout(() => {
    // get current ticker price
    const btcUsdTickerPrice = btcUsdTicker.price;

    // get ticker history
    const btcUsdTickerHistory = btcUsdTicker.history;

    // get whether or not the ticker is active
    const btcUsdTickerActive = btcUsdTicker.active;

    // stop the ticker from making any new requests
    btcUsdTicker.stop();
}, 5000);
```

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the repository
2. Create your feature branch (`git checkout -b {username}/my-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin {username}/my-feature`)
5. [Open a pull request](https://github.com/wardenfinance/currency/pulls)

## License

Distributed under the MIT License. See [LICENSE](https://github.com/wardenfinance/currency/tree/main/LICENSE) for more information.
