// tslint:disable-next-line
import { takeEvery } from 'redux-saga/effects';
import {
    GET_LABEL_FETCH,
} from '../constants';
import { labelSaga } from './labelSaga';

export function* rootLabelSaga() {
    yield takeEvery(GET_LABEL_FETCH, labelSaga);
}


// WEBPACK FOOTER //
// src/drone/src/src/modules/user/kyc/label/sagas/index.ts
