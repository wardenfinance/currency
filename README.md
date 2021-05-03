# currency
JavaScript library for dealing with different currencies.

![Version](https://img.shields.io/github/package-json/v/wardenfinance/currency)
![License](https://img.shields.io/github/license/wardenfinance/currency)
![David](https://img.shields.io/david/wardenfinance/currency)
[![Node.js CI](https://github.com/wardenfinance/currency/actions/workflows/node.js.yml/badge.svg)](https://github.com/wardenfinance/currency/actions/workflows/node.js.yml)
[![CodeQL](https://github.com/wardenfinance/currency/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/wardenfinance/currency/actions/workflows/codeql-analysis.yml)

## Installation

You can install _currency_ via **npm** or **yarn**

```sh
npm install --save https://github.com/wardenfinance/currency
```

```sh
yarn add https://github.com/wardenfinance/currency
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

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the repository
2. Create your feature branch (`git checkout -b {username}/my-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin {username}/my-feature`)
5. [Open a pull request](https://github.com/wardenfinance/currency/pulls)

## License

Distributed under the MIT License. See [LICENSE](https://github.com/wardenfinance/currency/tree/main/LICENSE) for more information.
