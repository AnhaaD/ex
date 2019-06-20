// tslint:disable-next-line
import { takeLatest } from 'redux-saga/effects';
import { HISTORY_FETCH, HISTORY_PUSH_EMIT } from '../constants';
import { historyPushSaga } from './historyPushSaga';
import { historySaga } from './historySaga';

export function* rootHistorySaga() {
    yield takeLatest(HISTORY_PUSH_EMIT, historyPushSaga);
    yield takeLatest(HISTORY_FETCH, historySaga);
}


// WEBPACK FOOTER //
// src/drone/src/src/modules/user/history/sagas/index.ts
