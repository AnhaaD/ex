import { LeaderBoardAction } from './actions';
import {
    LEADERBOARD_DATA,
    LEADERBOARD_FETCH,
} from './constants';
import { UserLeaderBoard } from './types';

export interface LeaderBoardState {
    users: UserLeaderBoard[];
    loading: boolean;
}

export const initialLeaderBoardState: LeaderBoardState = {
    users: [],
    loading: false,
};

export const leaderBoardReducer = (state = initialLeaderBoardState, action: LeaderBoardAction) => {
    switch (action.type) {
        case LEADERBOARD_FETCH:
            return {
                users: [],
                loading: true,
            };
        case LEADERBOARD_DATA:
            return {
                users: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/user/leaderboard/reducer.ts
