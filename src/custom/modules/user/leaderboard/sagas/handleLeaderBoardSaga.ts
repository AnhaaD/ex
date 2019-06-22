// tslint:disable-next-line
import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../../api';
import { alertPush } from '../../../../../modules';
import {
    leaderboardData,
    LeaderBoardFetch,
} from '../actions';

const leaderboardOptions: RequestOptions = {
    apiVersion: 'applogic',
};

export function* leaderBoardFetchSaga(action: LeaderBoardFetch) {
    try {
        const users = yield call(API.get(leaderboardOptions), '/public/performance');
        yield put(leaderboardData(users));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/user/leaderboard/sagas/handleLeaderBoardSaga.ts
