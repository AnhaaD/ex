export const PG_TITLE_PREFIX = 'Libra Exchange';

export const pgRoutes = (isLoggedIn: boolean): string[][][] => {
    const routesLeft = [
        ['page.header.navbar.markets', '/markets'],
        ['page.header.navbar.exchange', '/trading'],
        // ['page.header.navbar.social', '/social/me'],
        // ['page.header.navbar.leaderboards', '/leaderboard'],
    ];

    const routesRight = [
        ['page.header.navbar.balances', '/wallets'],
        ['page.header.navbar.orders', '/orders'],
        ['page.header.navbar.history', '/history'],
    ];

    const routesUnloggedInLeft = [
        ['page.header.navbar.home', '/home'],
        ['page.header.navbar.exchange', '/trading'],
        // ['page.header.navbar.leaderboards', '/leaderboard'],
    ];

    const routesUnloggedInRight = [
        ['page.header.navbar.signUp', '/signup'],
        ['page.header.navbar.signIn', '/signin'],
    ];

    return isLoggedIn ? [routesLeft, routesRight] : [routesUnloggedInLeft, routesUnloggedInRight];
};

export const DEFAULT_WALLET_PRECISION = 4;
export const STORAGE_DEFAULT_LIMIT = 50;
export const VALUATION_CURRENCY = 'USDT';


// WEBPACK FOOTER //
// src/drone/src/src/custom/constants/index.ts
