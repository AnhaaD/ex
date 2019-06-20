import { combineReducers } from 'redux';
import { alertReducer  } from './public/alert';
import { currenciesReducer } from './public/currencies';
import { gridLayoutReducer } from './public/gridLayout/reducer';
import { changeLanguageReducer  } from './public/i18n';
import { klineReducer  } from './public/kline';
import { marketsReducer } from './public/markets';
import { depthReducer, orderBookReducer  } from './public/orderBook';
import { rangerReducer  } from './public/ranger/reducer';
import { recentTradesReducer  } from './public/recentTrades';
import { apiKeysReducer } from './user/apiKeys';
import { authReducer  } from './user/auth';
import { sendEmailVerificationReducer } from './user/emailVerification';
import { historyReducer  } from './user/history';
import {
    documentsReducer,
    identityReducer,
    labelReducer,
    phoneReducer,
} from './user/kyc';
import { openOrdersReducer } from './user/openOrders';
import { ordersReducer  } from './user/orders';
import { ordersHistoryReducer  } from './user/ordersHistory';
import { passwordReducer  } from './user/password';
import { profileReducer  } from './user/profile';
import { userActivityReducer  } from './user/userActivity';
import { walletsReducer  } from './user/wallets';

export const publicReducer = combineReducers({
    alerts: alertReducer,
    currencies: currenciesReducer,
    depth: depthReducer,
    i18n: changeLanguageReducer,
    kline: klineReducer,
    markets: marketsReducer,
    orderBook: orderBookReducer,
    ranger: rangerReducer,
    recentTrades: recentTradesReducer,
    rgl: gridLayoutReducer,
});

export const userReducer = combineReducers({
    auth: authReducer,
    label: labelReducer,
    orders: ordersReducer,
    password: passwordReducer,
    profile: profileReducer,
    wallets: walletsReducer,
    phone: phoneReducer,
    identity: identityReducer,
    documents: documentsReducer,
    history: historyReducer,
    apiKeys: apiKeysReducer,
    userActivity: userActivityReducer,
    ordersHistory: ordersHistoryReducer,
    openOrders: openOrdersReducer,
    sendEmailVerification: sendEmailVerificationReducer,
});


// WEBPACK FOOTER //
// src/drone/src/src/modules/app.ts
