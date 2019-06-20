// tslint:disable-next-line
import { call, put } from 'redux-saga/effects';
import { API, defaultStorageLimit, RequestOptions } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { failHistory, HistoryFetch, successHistory } from '../actions';

const config: RequestOptions = {
    apiVersion: 'peatio',
    withHeaders: true,
};

export function* historySaga(action: HistoryFetch) {
    try {
        const { page, currency, type, limit, market } = action.payload;
        const coreEndpoint = {
            deposits: '/account/deposits',
            withdraws: '/account/withdraws',
            trades: '/market/trades',
        };
        const currencyParam = currency ? `&currency=${currency}` : '';
        const marketParam = market ? `market=${market}` : '';
        const operation = market ? '&' : '';
        const limitParam = limit !== 0 ? `${operation}limit=${limit}` : '';
        const pageParam = limit !== 0 ? `&page=${page + 1}` : '';

        const { data, headers } = yield call(API.get(config), `${coreEndpoint[type]}?${marketParam}${limitParam}${pageParam}${currencyParam}`);
        let updatedData = data;
        if (type === 'trades') {
            updatedData = data.slice(0, defaultStorageLimit());
        }

        yield put(successHistory({ list: updatedData, page, fullHistory: headers.total }));
    } catch (error) {
        yield put(failHistory([]));
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}


// WEBPACK FOOTER //
// src/drone/src/src/modules/user/history/sagas/historySaga.ts
