// tslint:disable-next-line
import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../../api';
import { alertPush } from '../../../../../modules';
import {
    getUserProfileData,
    GetUserProfileFetch,
} from '../actions';

const socialOptions: RequestOptions = {
    apiVersion: 'applogic',
};

export function* getUserProfileFetchSaga(action: GetUserProfileFetch) {
    try {
        const user = yield call(API.get(socialOptions), `/private/profiles/${action.payload.nickname}?period=${action.payload.period}`);
        yield put(getUserProfileData(user));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/user/social/sagas/handleGetUserProfileDataSaga.ts
