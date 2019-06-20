import { RootState } from '../../../../modules';
import { UserLeaderBoard } from './types';

export const selectLeaderBoardUsers = (state: RootState): UserLeaderBoard[] =>
    state.customUser.leaderBoard.users;

export const selectLeaderBoardUsersLoading = (state: RootState): boolean =>
    state.customUser.leaderBoard.loading;


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/user/leaderboard/selectors.ts
