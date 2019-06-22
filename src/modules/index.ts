import { combineReducers } from 'redux';
// tslint:disable-next-line no-submodule-imports
import { all, call } from 'redux-saga/effects';
import { publicReducer, userReducer } from './app';
import { AlertState, rootHandleAlertSaga } from './public/alert';
import { CurrenciesState, rootCurrenciesSaga } from './public/currencies';
import { GridLayoutState } from './public/gridLayout/reducer';
import { LanguageState } from './public/i18n';
import { KlineState, rootKlineFetchSaga } from './public/kline';
import { MarketsState, rootMarketsSaga } from './public/markets';
import { DepthState, OrderBookState, rootOrderBookSaga } from './public/orderBook';
import { RangerState } from './public/ranger/reducer';
import { RecentTradesState, rootRecentTradesSaga } from './public/recentTrades';
import { ApiKeysState } from './user/apiKeys';
import { rootApiKeysSaga } from './user/apiKeys/sagas';
import { AuthState, rootAuthSaga } from './user/auth';
import { EmailVerificationState, rootEmailVerificationSaga } from './user/emailVerification';
import { HistoryState, rootHistorySaga } from './user/history';
import { DocumentsState, rootSendDocumentsSaga } from './user/kyc/documents';
import { IdentityState, rootSendIdentitySaga } from './user/kyc/identity';
import { LabelState, rootLabelSaga } from './user/kyc/label';
import { PhoneState, rootSendCodeSaga } from './user/kyc/phone';
import { OpenOrdersState, rootOpenOrdersSaga } from './user/openOrders';
import { OrdersState, rootOrdersSaga } from './user/orders';
import { OrdersHistoryState, rootOrdersHistorySaga } from './user/ordersHistory';
import { PasswordState, rootPasswordSaga } from './user/password';
import { ProfileState, rootProfileSaga } from './user/profile';
import { rootUserActivitySaga, UserActivityState } from './user/userActivity';
import { rootWalletsSaga, WalletsState } from './user/wallets';

import {
    ColorThemeState,
    customPublicReducer,
    customUserReducer,
    LeaderBoardState,
    rootHandleLeaderBoardSaga,
    rootHandleSocialSaga,
    rootHandleSubscriptionSaga,
    SocialState,
    SubscriptionState,
} from '../custom/modules';

export * from '../custom/modules';
export * from './public/alert';
export * from './public/currencies';
export * from './public/i18n';
export * from './public/kline';
export * from './public/markets';
export * from './public/orderBook';
export * from './user/apiKeys';
export * from './user/auth';
export * from './user/emailVerification';
export * from './user/history';
export * from './user/kyc';
export * from './user/openOrders';
export * from './user/orders';
export * from './user/ordersHistory';
export * from './user/password';
export * from './user/profile';
export * from './user/userActivity';
export * from './user/wallets';

export interface RootState {
    public: {
        alerts: AlertState;
        currencies: CurrenciesState;
        depth: DepthState;
        i18n: LanguageState;
        kline: KlineState;
        markets: MarketsState;
        orderBook: OrderBookState;
        ranger: RangerState;
        recentTrades: RecentTradesState;
        rgl: GridLayoutState;
    };
    user: {
        apiKeys: ApiKeysState;
        auth: AuthState;
        documents: DocumentsState;
        history: HistoryState;
        identity: IdentityState;
        label: LabelState;
        openOrders: OpenOrdersState;
        orders: OrdersState;
        ordersHistory: OrdersHistoryState;
        password: PasswordState;
        phone: PhoneState;
        profile: ProfileState;
        sendEmailVerification: EmailVerificationState;
        userActivity: UserActivityState;
        wallets: WalletsState;
    };
    customPublic: {
        colorTheme: ColorThemeState;
    };
    customUser: {
        leaderBoard: LeaderBoardState;
        social: SocialState;
        subscription: SubscriptionState;
    };
}

export const rootReducer = combineReducers({
    public: publicReducer,
    user: userReducer,
    customPublic: customPublicReducer,
    customUser: customUserReducer,
});

export function* rootSaga() {
    yield all([
        call(rootAuthSaga),
        call(rootCurrenciesSaga),
        call(rootEmailVerificationSaga),
        call(rootHandleAlertSaga),
        call(rootHistorySaga),
        call(rootKlineFetchSaga),
        call(rootLabelSaga),
        call(rootMarketsSaga),
        call(rootOpenOrdersSaga),
        call(rootOrderBookSaga),
        call(rootOrdersHistorySaga),
        call(rootOrdersSaga),
        call(rootPasswordSaga),
        call(rootProfileSaga),
        call(rootRecentTradesSaga),
        call(rootSendCodeSaga),
        call(rootSendDocumentsSaga),
        call(rootSendIdentitySaga),
        call(rootUserActivitySaga),
        call(rootWalletsSaga),
        call(rootApiKeysSaga),
        call(rootHandleLeaderBoardSaga),
        call(rootHandleSocialSaga),
        call(rootHandleSubscriptionSaga),
    ]);
}


// WEBPACK FOOTER //
// src/drone/src/src/modules/index.ts
