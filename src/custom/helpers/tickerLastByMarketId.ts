import { Ticker } from '../../modules';

export const tickerLastByMarketId = (tickers: { [key: string]: Ticker }, market: string) => {
    const defaultTicker = {
        last: 0,
    };
    return (tickers[market] || defaultTicker).last;
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/helpers/tickerLastByMarketId.ts
