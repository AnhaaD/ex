// tslint:disable-next-line:no-submodule-imports
import { call, delay, put } from 'redux-saga/effects';
import { API, msAlertDisplayTime, RequestOptions } from '../../../../api';
import { alertPush } from '../../../public/alert';
import {
    walletsAddressData,
    walletsAddressError,
    WalletsAddressFetch,
} from '../actions';

const walletsAddressOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* walletsAddressSaga(action: WalletsAddressFetch) {
    try {
        const currency = action.payload.currency.toLocaleLowerCase();
        const url = `/account/deposit_address/${currency}`;
        if (action.payload.timeout) {
            yield delay(parseFloat(msAlertDisplayTime()));
        }
        const { address } = yield call(API.get(walletsAddressOptions), url);

        yield put(walletsAddressData({
            address,
            currency,
        }));
    } catch (error) {
        yield put(walletsAddressError(error));
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}


// WEBPACK FOOTER //
// src/drone/src/src/modules/user/wallets/sagas/walletsAddressSaga.ts
