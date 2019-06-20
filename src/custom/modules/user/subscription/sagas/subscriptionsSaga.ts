// tslint:disable-next-line: no-submodule-imports
import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../../api';
import { alertPush } from '../../../../../modules';
import {
    subscriptionsData,
    SubscriptionsFetch,
} from '../actions';

const subscriptionsOptions: RequestOptions = {
    apiVersion: 'applogic',
    withHeaders: true,
};

export function* subscriptionsSaga(action: SubscriptionsFetch) {
    try {
        const { page, limit } = action.payload;
        const { data, headers } = yield call(API.get(subscriptionsOptions), `/private/subscriptions?limit=${limit}&page=${page + 1}`);

        const newUsers = data.map(user => {
            return {
                ...user,
                performances: {
                    d1: user.performances['1d'],
                    d7: user.performances['7d'],
                    d30: user.performances['30d'],
                    d90: user.performances['90d'],
                },
            };
        });

        yield put(subscriptionsData({ list: newUsers, limit, page: page + 1, total: headers.total }));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/user/subscription/sagas/subscriptionsSaga.ts
