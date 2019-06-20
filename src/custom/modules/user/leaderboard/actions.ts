import {
    LEADERBOARD_DATA,
    LEADERBOARD_FETCH,
} from './constants';
import { UserLeaderBoard } from './types';

export interface LeaderBoardFetch {
    type: typeof LEADERBOARD_FETCH;
}

export interface LeaderBoardData {
    type: typeof LEADERBOARD_DATA;
    payload: UserLeaderBoard[];
}

export type LeaderBoardAction = LeaderBoardFetch | LeaderBoardData;

export const getLeaderBoard = (): LeaderBoardFetch => ({
    type: LEADERBOARD_FETCH,
});

export const leaderboardData = (payload: LeaderBoardData['payload']): LeaderBoardData => ({
    type: LEADERBOARD_DATA,
    payload,
});


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/user/leaderboard/actions.ts
