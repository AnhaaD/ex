import { RootState } from '../../index';
import { KlineState } from './reducer';

export const selectKline = (state: RootState): KlineState =>
    state.public.kline;


// WEBPACK FOOTER //
// src/drone/src/src/modules/public/kline/selectors.ts
