// tslint:disable-next-line: no-submodule-imports
import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
    CREATE_SUBSCRIPTION_FETCH,
    SUBSCRIPTIONS_FETCH,
    UNSUBSCRIBE_SUBSCRIPTION_FETCH,
} from '../constants';
import { createSubscriptionSaga } from './handleCreateSubscriptionSaga';
import { unsubscribeSubscriptionSaga } from './handleUnsubscribeSubscriptionSaga';
import { subscriptionsSaga } from './subscriptionsSaga';

export function* rootHandleSubscriptionSaga() {
    yield takeEvery(CREATE_SUBSCRIPTION_FETCH, createSubscriptionSaga);
    yield takeLatest(SUBSCRIPTIONS_FETCH, subscriptionsSaga);
    yield takeEvery(UNSUBSCRIBE_SUBSCRIPTION_FETCH, unsubscribeSubscriptionSaga);
}


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/user/subscription/sagas/index.ts
