import { RootState } from '../../index';
import { CurrenciesState } from './reducer';
import { Currency } from './types';

const selectCurrenciesState = (state: RootState): CurrenciesState => state.public.currencies;

export const selectCurrencies = (state: RootState): Currency[] =>
    selectCurrenciesState(state).list;

export const selectCurrenciesLoading = (state: RootState): boolean | undefined =>
    selectCurrenciesState(state).loading;


// WEBPACK FOOTER //
// src/drone/src/src/modules/public/currencies/selectors.ts
