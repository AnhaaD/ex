import { Currency } from '../../modules/public/currencies';

export const handleGetMinWithdrawAmount = (currencies: Currency[], targetCurrency: string) => {
    const currentCurrency = currencies.find(currency => {
        return currency.id.toLowerCase() === targetCurrency.toLowerCase();
    });

    if (currentCurrency) {
        return currentCurrency.min_withdraw_amount;
    } else {
        return '';
    }
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/helpers/handleGetMinWithdrawAmount.ts
