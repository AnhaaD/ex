// tslint:disable-next-line
import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../../api';
import { alertPush } from '../../../../../modules';
import {
    getProfileMeData,
    GetProfileMeFetch,
} from '../actions';

const socialOptions: RequestOptions = {
    apiVersion: 'applogic',
};

export function* getUsersMeFetchSaga(action: GetProfileMeFetch) {
    try {
        const userMe = yield call(API.get(socialOptions), `/private/profile/me`);

        yield put(getProfileMeData(userMe));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/user/social/sagas/handleGetUsersMeSaga.ts
