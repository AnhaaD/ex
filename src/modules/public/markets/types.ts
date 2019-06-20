export interface Market {
    ask_unit: any;
    bid_unit: any;
    name: any;
    id: any;
    ask_precision: any;
    bid_precision: any;
    last: any;
    vol: any;
    bid_fee: any;
    ask_fee: any;
}
export interface Ticker {
    price_change_percent: any;
    last: any;
    vol: any;
}
export interface TickerEvent {
    open: any;
    low: any;
    high: any;
    last: any;
    volume: any;
    sell: any;
    buy: any;
    avg_price: any;
    price_change_percent: any;
}
