// tslint:disable-next-line
import { takeEvery } from 'redux-saga/effects';
import { ALERT_PUSH } from '../constants';
import { handleAlertSaga } from './handleAlertSaga';

export function* rootHandleAlertSaga() {
    yield takeEvery(ALERT_PUSH, handleAlertSaga);
}


// WEBPACK FOOTER //
// src/drone/src/src/modules/public/alert/sagas/index.ts
