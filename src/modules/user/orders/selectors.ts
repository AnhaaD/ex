import { RootState } from '../../index';

const selectOrdersState = (state: RootState): RootState['user']['orders'] =>
    state.user.orders;

export const selectOrderExecuteLoading = (state: RootState): boolean =>
    selectOrdersState(state).executeLoading;

export const selectCurrentPrice = (state: RootState): string =>
    selectOrdersState(state).currentPrice;


// WEBPACK FOOTER //
// src/drone/src/src/modules/user/orders/selectors.ts
