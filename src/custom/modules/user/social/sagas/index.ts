// tslint:disable-next-line
import { takeEvery } from 'redux-saga/effects';
import {
    GET_PROFILE_ME_FETCH,
    GET_PROFILE_USER_FETCH,
    POST_PROFILE_USER_FETCH,
} from '../constants';
import { getUserProfileFetchSaga } from './handleGetUserProfileDataSaga';
import { getUsersMeFetchSaga } from './handleGetUsersMeSaga';
import { postUserProfileFetchSaga } from './handleUpdateUserProfileSaga';

export function* rootHandleSocialSaga() {
    yield takeEvery(GET_PROFILE_ME_FETCH, getUsersMeFetchSaga);
    yield takeEvery(GET_PROFILE_USER_FETCH, getUserProfileFetchSaga);
    yield takeEvery(POST_PROFILE_USER_FETCH, postUserProfileFetchSaga);
}


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/user/social/sagas/index.ts
