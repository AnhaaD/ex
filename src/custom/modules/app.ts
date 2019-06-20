import { combineReducers } from 'redux';
import { changeColorThemeReducer  } from './public/colorTheme';
import { leaderBoardReducer } from './user/leaderboard';
import { socialReducer } from './user/social';
import { subscriptionReducer } from './user/subscription';

export const customPublicReducer = combineReducers({
    colorTheme: changeColorThemeReducer,
});

export const customUserReducer = combineReducers({
    leaderBoard: leaderBoardReducer,
    social: socialReducer,
    subscription: subscriptionReducer,
});


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/app.ts
