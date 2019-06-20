export interface OrderEvent {
    market: any;
    id: any;
    at: any;
    kind: any;
    price: any;
    state: any;
    remaining_volume: any;
    origin_volume: any;
}
export interface OrderAPI {
    id: any;
    side: any;
    price: any;
    state: any;
    created_at: any;
    remaining_volume: any;
    origin_volume: any;
    executed_volume: any;
    market: any;
    ord_type: any;
    avg_price: any;
    updated_at: any;
}
export interface OrderSide {}
export interface OrderCommon {
    id: any;
    side: any;
    price: any;
    state: any;
    created_at: any;
    remaining_volume: any;
    origin_volume: any;
    executed_volume: any;
    market: any;
    ord_type?: any;
    avg_price?: any;
    updated_at?: any;
}
export interface CommonError {
    code: number;
    message: string[];
}
export interface CommonState {}
