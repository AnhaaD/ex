import {
    CREATE_SUBSCRIPTION_DATA,
    CREATE_SUBSCRIPTION_FETCH,
    SUBSCRIPTIONS_DATA,
    SUBSCRIPTIONS_ERROR,
    SUBSCRIPTIONS_FETCH,
    UNSUBSCRIBE_SUBSCRIPTION_DATA,
    UNSUBSCRIBE_SUBSCRIPTION_FETCH,
} from './constants';
import { UserSubscriptions } from './types';

interface SubscriptionsFetchPayload {
    page: number;
    limit: number;
}

export interface SubscriptionsFetchSuccessPayload {
    list: UserSubscriptions[];
    limit: number;
    page: number;
    total: number;
}

export interface CreateSubscriptionFetch {
    type: typeof CREATE_SUBSCRIPTION_FETCH;
    payload: {
        nickname: string;
    };
}

export interface CreateSubscriptionData {
    type: typeof CREATE_SUBSCRIPTION_DATA;
}

export interface SubscriptionsFetch {
    type: typeof SUBSCRIPTIONS_FETCH;
    payload: SubscriptionsFetchPayload;
}


export interface SubscriptionsData {
    type: typeof SUBSCRIPTIONS_DATA;
    payload: SubscriptionsFetchSuccessPayload;
}

export interface SubscriptionsError {
    type: typeof SUBSCRIPTIONS_ERROR;
    payload: {
        code: number;
        message: string[];
    };
}

export interface UnsubscribeSubscriptionFetch {
    type: typeof UNSUBSCRIBE_SUBSCRIPTION_FETCH;
    payload: {
        nickname: string;
    };
}

export interface UnsubscribeSubscriptionData {
    type: typeof UNSUBSCRIBE_SUBSCRIPTION_DATA;
}

export type SubscriptionAction = CreateSubscriptionData
    | CreateSubscriptionFetch
    | SubscriptionsData
    | SubscriptionsError
    | SubscriptionsFetch
    | UnsubscribeSubscriptionData
    | UnsubscribeSubscriptionFetch;

export const createSubscription = (payload: CreateSubscriptionFetch['payload']): CreateSubscriptionFetch => ({
    type: CREATE_SUBSCRIPTION_FETCH,
    payload,
});

export const createSubscriptionData = (): CreateSubscriptionData => ({
    type: CREATE_SUBSCRIPTION_DATA,
});

export const getSubscriptions = (payload: SubscriptionsFetchPayload): SubscriptionsFetch => ({
    type: SUBSCRIPTIONS_FETCH,
    payload,
});

export const subscriptionsData = (payload: SubscriptionsData['payload']): SubscriptionsData => ({
    type: SUBSCRIPTIONS_DATA,
    payload,
});

export const subscriptionsError = (payload: SubscriptionsError['payload']): SubscriptionsError => ({
    type: SUBSCRIPTIONS_ERROR,
    payload,
});

export const unsubscribeSubscription = (payload: UnsubscribeSubscriptionFetch['payload']): UnsubscribeSubscriptionFetch => ({
    type: UNSUBSCRIBE_SUBSCRIPTION_FETCH,
    payload,
});

export const unsubscribeSubscriptionData = (): UnsubscribeSubscriptionData => ({
    type: UNSUBSCRIBE_SUBSCRIPTION_DATA,
});


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/user/subscription/actions.ts
