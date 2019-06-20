import { RootState } from '../../../../modules';
import { UserSubscriptions } from './types';

export const selectSubscriptionsUsers = (state: RootState): UserSubscriptions[] =>
    state.customUser.subscription.list;

export const selectSubscriptionsTotalNumber = (state: RootState): number =>
    state.customUser.subscription.total;

export const selectSubscriptionsCurrentPage = (state: RootState): number =>
    state.customUser.subscription.page;

export const selectSubscriptionsPageCount = (state: RootState): number =>
    state.customUser.subscription.pageCount;

export const selectSubscriptionsLoading = (state: RootState): boolean =>
    state.customUser.subscription.loading;


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/user/subscription/selectors.ts
