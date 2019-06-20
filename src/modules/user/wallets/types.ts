export interface Wallet {
    /**
     * Wallet address
     */
    address?: string;
    /**
     * Crypto currency code
     */
    currency: string;
    /**
     * Crypto currency name
     */
    name: string;
    /**
     * Amount of currency
     */
    balance: number;
    /**
     * Locked amount of currency
     */
    locked?: number;
    /**
     * type of a currency (fiat or coin)
     */
    type: 'fiat' | 'coin';
    /**
     * Fee of a currency
     */
    fee: number;
    /**
     * true if a wallet
     */
    active?: boolean;
    fixed: number;
    /**
     * Value for url for wallet icon. If empty string, then there will be icon displayed from @openware/cryptoicon
     */
    iconUrl?: string;
}
export interface WalletAddress {
    currency: any;
    address: string;
}
export interface WalletWithdrawCCY {}

