export interface MakerType {}
export interface PublicTrade {
    market: string;
    id: any;
    created_at: string;
    taker_type: any;
    price: string;
    volume: string;
    funds: string;
}
export interface PrivateTrade {
    market: string;
    id: any;
    created_at: string;
    taker_type: any;
    price: string;
    volume: string;
    funds: string;
}
export interface PrivateTradeEvent {
    id: any;
    at: any;
    market: any;
    kind: any;
    price: any;
    volume: any;
}
export interface WalletHistoryList {
    length: any;
    sort: any;
}
