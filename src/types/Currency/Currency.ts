import CryptoCurrencies from '~types/CryptoCurrencies';
import FiatCurrencies from '~types/FiatCurrencies';

class Currency {
    protected readonly _name: string;
    protected readonly _symbol: string;
    protected readonly _character?: string;
    protected readonly _summary?: string;
    protected readonly _description?: string;
    protected readonly _website?: string;

    constructor(currency: CryptoCurrencies | FiatCurrencies) {
        let name: string;
        let symbol: string;
        let character: string | undefined;
        let summary: string | undefined;
        let description: string | undefined;
        let website: string | undefined;
        switch(currency) {
            /** Crypto Currencies */
            case CryptoCurrencies.ADA:
                name = 'Cardano';
                symbol = 'ADA';
                character = '₳';
                summary = 'Layered currency and contracts';
                description = 'A proof-of-stake blockchain platform: developed through evidence-based methods and peer-reviewed research.';
                website = 'https://cardano.org';
                break;
            case CryptoCurrencies.ALGO:
                name = 'Algorland';
                symbol = 'ALGO';
                website = 'https://www.algorand.com';
                break;
            case CryptoCurrencies.ATOM:
                name = 'Cosmos';
                symbol = 'ATOM';
                description = 'Cosmos is an ever-expanding ecosystem of interconnected apps and services, built for a decentralized future.';
                website = 'https://cosmos.network';
                break;
            case CryptoCurrencies.BNB:
                name = 'Binance Coin';
                symbol = 'BNB';
                description = 'Binance coin is an Ethereum-based token that can be used to trade cryptocurrencies and pay for fees on the Binance exchange.';
                website = 'https://www.binance.com';
                break;
            case CryptoCurrencies.BTC:
                name = 'Bitcoin';
                symbol = 'BTC';
                character = '₿';
                summary = 'Digital gold';
                description = 'Bitcoin is a peer-to-peer online currency, meaning that all transactions happen directly between equal, independent network participants, without the need for any intermediary to permit or facilitate them.';
                website = 'https://bitcoin.org';
                break;
            case CryptoCurrencies.DAI:
                name = 'Dai';
                symbol = 'DAI';
                description = 'Dai is a stablecoin cryptocurrency which aims to keep its value as close to one United States dollar (USD) as possible through an automated system of smart contracts on the Ethereum blockchain.';
                website = 'https://makerdao.com';
                break;
            case CryptoCurrencies.DASH:
                name = 'Dash';
                symbol = 'DASH';
                summary = 'Dash is a bitcoin-based currency featuring instant transactions, decentralized governance and budgeting, and private transactions.';
            case CryptoCurrencies.DNT:
                name = 'District0x';
                symbol = 'DNT';
                break;
            case CryptoCurrencies.DOT:
                name = 'Polkadot';
                symbol = 'DOT';
                summary = 'Polkadot provides unprecedented economic scalability by enabling a common set of validators to secure multiple blockchains.';
                website = 'https://polkadot.network';
                break;
            case CryptoCurrencies.ETH:
                name = 'Ethereum';
                symbol = 'ETH';
                summary = 'Ethereum is a decentralized, open-source blockchain with smart contract functionality.';
                website = 'https://ethereum.org';
                break;
            case CryptoCurrencies.GLM:
                name = 'Golem';
                symbol = 'GLM';
                summary = 'The Golem Network fosters a global group of creators building ambitious software solutions that will shape the technological landscape of future generations by accessing computing resources across the platform.';
                website = 'https://www.golem.network';
                break;
            case CryptoCurrencies.LINK:
                name = 'Chainlink';
                symbol = 'LINK';
                summary = 'Chainlink\'s decentralized oracle network provides reliable, tamper-proof inputs and outputs for complex smart contracts on any blockchain.';
                website = 'https://chain.link';
                break;
            case CryptoCurrencies.LTC:
                name = 'Litecoin';
                symbol = 'LTC';
                character = 'Ł';
                summary = 'Litecoin is a peer-to-peer Internet currency that enables instant, near-zero cost payments to anyone in the world.';
                website = 'https://litecoin.org';
                break;
            case CryptoCurrencies.STORJ:
                name = 'Storj';
                symbol = 'STORJ';
                summary = 'Storj is an Ethereum-based token that powers a decentralized cloud storage network called Tardigrade.';
                website = 'https://www.storj.io';
                break;
            case CryptoCurrencies.REN:
                name = 'Ren';
                symbol = 'REN';
                break;
            case CryptoCurrencies.XLM:
                name = 'Stellar';
                symbol = 'XLM';
                summary = 'Digital IOUs';
                description = 'Open-source, decentralized global financial network.';
                break;
            case CryptoCurrencies.XRP:
                name = 'Ripple';
                symbol = 'XRP';
                break;
            case CryptoCurrencies.XTZ:
                name = 'Tezos';
                symbol = 'XTZ';
                character = 'ꜩ';
                description = 'Tezos is an open-source platform for assets and applications backed by a global community of validators, researchers, and builders.';
                break;
            /** Fiat Currencies */
            case FiatCurrencies.EUR:
                name = 'Euro';
                symbol = 'EUR';
                character = '€';
                summary = 'The euro is the official currency of 19 of the 27 member states of the European Union.';
                website = 'https://europa.eu';
                break;
            case FiatCurrencies.USD:
                name = 'US Dollar';
                symbol = 'USD';
                character = '$';
                summary = 'USD is the official currency of United States of America and the world\'s primary reserve currency.';
                website = 'https://www.usa.gov';
                break;
        }

        this._name = name;
        this._symbol = symbol;
        this._character = character;
        this._description = description;
    }

    public get name(): string { return this._name; }
    public get symbol(): string { return this._symbol; }
    public get character(): string | undefined { return this._character; }
    public get summary(): string | undefined { return this._summary; }
    public get description(): string | undefined { return this._description; }
    public get website(): string | undefined { return this._website; }
}

const c = new Currency(FiatCurrencies.USD);

export default Currency;
