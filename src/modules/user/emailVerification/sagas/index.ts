// tslint:disable-next-line
import { takeLatest } from 'redux-saga/effects';
import {
    EMAIL_VERIFICATION_FETCH,
} from '../constants';
import { emailVerificationSaga } from './emailVerificationSaga';

export function* rootEmailVerificationSaga() {
    yield takeLatest(EMAIL_VERIFICATION_FETCH, emailVerificationSaga);
}


// WEBPACK FOOTER //
// src/drone/src/src/modules/user/emailVerification/sagas/index.ts
