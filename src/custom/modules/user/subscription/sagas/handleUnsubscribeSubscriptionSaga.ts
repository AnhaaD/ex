// tslint:disable-next-line
import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../../api';
import { alertPush } from '../../../../../modules';
import {
    unsubscribeSubscriptionData,
    UnsubscribeSubscriptionFetch,
} from '../actions';

const unsubscribeSubscriptionOptions: RequestOptions = {
    apiVersion: 'applogic',
};

export function* unsubscribeSubscriptionSaga(action: UnsubscribeSubscriptionFetch) {
    try {
        const payload = {
            subscription: { enabled: false },
        };
        yield call(API.put(unsubscribeSubscriptionOptions), `/private/subscriptions/${action.payload.nickname}`, payload);

        yield put(unsubscribeSubscriptionData());
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/user/subscription/sagas/handleUnsubscribeSubscriptionSaga.ts
