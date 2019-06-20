import { SubscriptionAction } from './actions';
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

export interface SubscriptionState {
    loading: boolean;
    page: number;
    pageCount: number;
    total: number;
    list: UserSubscriptions[];
    limit: number;
    error?: {
        code: number;
        message: string[];
    };
}

export const initialSubscriptionState: SubscriptionState = {
    loading: false,
    list: [],
    limit: 0,
    page: 0,
    pageCount: 0,
    total: 0,
};

export const subscriptionReducer = (state = initialSubscriptionState, action: SubscriptionAction) => {
    switch (action.type) {
        case CREATE_SUBSCRIPTION_FETCH:
            return {
                ...state,
                loading: true,
            };
        case CREATE_SUBSCRIPTION_DATA:
            return {
                ...state,
                loading: false,
            };
        case SUBSCRIPTIONS_FETCH:
            return {
                ...state,
                list: [],
                loading: true,
            };
        case SUBSCRIPTIONS_DATA:
            return {
                ...state,
                list: action.payload.list,
                limit: action.payload.limit,
                loading: false,
                page: action.payload.page,
                pageCount: Math.ceil(action.payload.total / action.payload.limit),
                total: action.payload.total,
            };
        case SUBSCRIPTIONS_ERROR:
            return {
                ...state,
                error: action.payload,
                list: [],
                limit: 0,
                loading: false,
                page: 0,
                pageCount: 0,
                total: 0,
            };
        case UNSUBSCRIBE_SUBSCRIPTION_FETCH:
            return {
                ...state,
                loading: true,
            };
        case UNSUBSCRIBE_SUBSCRIPTION_DATA:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/user/subscription/reducer.ts
