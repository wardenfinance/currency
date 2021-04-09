# currency
JavaScript library for dealing with different currencies.

![Version](https://img.shields.io/github/package-json/v/wardenfinance/currency)
![License](https://img.shields.io/github/license/wardenfinance/currency)
![David](https://img.shields.io/david/wardenfinance/currency)

[![Node.js CI](https://github.com/wardenfinance/currency/actions/workflows/node.js.yml/badge.svg)](https://github.com/wardenfinance/currency/actions/workflows/node.js.yml)
[![CodeQL](https://github.com/wardenfinance/currency/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/wardenfinance/currency/actions/workflows/codeql-analysis.yml)

## Package

```sh
 npm install --save @wardenfinance/currency
```

## Usage

### Currency Enums

You can access enumerations of both cryptocurrencies and fiat currencies:

```typescript
import {
    CryptoCurrencies,
    FiatCurrencies
} from '@wardenfinance/currency';

const btc = CryptoCurrencies.BTC;
const usd = FiatCurrencies.USD;
```

### Tickers

Tickers are class instances that allow you to fetch the fiat price of a cryptocurrency.

```typescript
import {
    CryptoCurrencies,
    FiatCurrencies,
    Ticker
} from '@wardenfinance/currency';

const xtz_usd = new Ticker(
    CryptoCurrencies.XTZ,
    FiatCurrencies.USD,
    () => {
        return new Promise<number | undefined>(resolve => {
            fetch('https://api.tzstats.com/markets/tickers', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(res => res.json())
                .then(json => {
                    const xtzUsd = json.find(o => o['pair'] === 'XTZ_USD' && o['exchange'] === 'coinbasepro');
                    if (xtzUsd) resolve(xtzUsd['last'] as number);
                });
        });
    },
    {
        refreshMs: 10000,
        onUpdate: (price => {
            console.log(price);
        }),
        onError: (e => {
            console.error(e);
        })
    }
);

xtz_usd.start(); // start the ticker
```
