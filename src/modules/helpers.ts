import { MakerType } from './user/history';

const makerTypeMap = {
    ask: 'sell',
    bid: 'buy',
};

export const kindToMakerType = (kind: string): MakerType => makerTypeMap[kind];


// WEBPACK FOOTER //
// src/drone/src/src/modules/helpers.ts
