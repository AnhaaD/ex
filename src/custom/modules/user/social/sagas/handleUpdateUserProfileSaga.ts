// tslint:disable-next-line
import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../../api';
import { alertPush } from '../../../../../modules';
import {
    getProfileMeData,
    PostUserProfileFetch,
} from '../actions';

const socialOptions: RequestOptions = {
    apiVersion: 'applogic',
};

export function* postUserProfileFetchSaga(action: PostUserProfileFetch) {
    try {
        const user = yield call(API.get(socialOptions), `/private/profile/me`);

        if (user) {
            const newUser = yield call(API.put(socialOptions), `/private/profiles/${user.nickname}`, action.payload.upload || action.payload);
            yield put(getProfileMeData(newUser));
        } else {
            const newUser = yield call(API.post(socialOptions), '/private/profiles', action.payload.upload || action.payload);
            yield put(getProfileMeData(newUser));
        }
    } catch (error) {
          yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/user/social/sagas/handleUpdateUserProfileSaga.ts
