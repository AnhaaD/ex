// tslint:disable-next-line
import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../../api';
import {
    createSubscriptionData,
    CreateSubscriptionFetch,
    subscriptionsError,
} from '../actions';

const createSubscriptionOptions: RequestOptions = {
    apiVersion: 'applogic',
};

export function* createSubscriptionSaga(action: CreateSubscriptionFetch) {
    try {
        const payload = { subscription: action.payload };
        yield call(API.post(createSubscriptionOptions), `/private/subscriptions`, payload);

        yield put(createSubscriptionData());
    } catch (error) {
        yield put(subscriptionsError({message: error.message, code: error.code}));
    }
}


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/user/subscription/sagas/handleCreateSubscriptionSaga.ts
