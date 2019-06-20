// tslint:disable-next-line
import { takeEvery } from 'redux-saga/effects';
import { LEADERBOARD_FETCH } from '../constants';
import { leaderBoardFetchSaga } from './handleLeaderBoardSaga';

export function* rootHandleLeaderBoardSaga() {
    yield takeEvery(LEADERBOARD_FETCH, leaderBoardFetchSaga);
}


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/user/leaderboard/sagas/index.ts
