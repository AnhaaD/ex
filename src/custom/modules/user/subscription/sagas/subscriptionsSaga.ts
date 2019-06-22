// tslint:disable-next-line: no-submodule-imports
import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../../api';
import {
    subscriptionsData,
    subscriptionsError,
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
                    d1: user.performances.d1,
                    d7: user.performances.d7,
                    d30: user.performances.d30,
                    d90: user.performances.d90,
                },
            };
        });

        yield put(subscriptionsData({ list: newUsers, limit, page: page + 1, total: headers.total }));
    } catch (error) {
        yield put(subscriptionsError({message: error.message, code: error.code}));
    }
}


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/user/subscription/sagas/subscriptionsSaga.ts
