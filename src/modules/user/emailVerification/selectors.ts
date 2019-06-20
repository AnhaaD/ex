import { RootState } from '../..';

export const selectSendEmailVerificationSuccess = (state: RootState): boolean =>
    state.user.sendEmailVerification.success;

export const selectSendEmailVerificationLoading = (state: RootState): boolean =>
    state.user.sendEmailVerification.loading;


// WEBPACK FOOTER //
// src/drone/src/src/modules/user/emailVerification/selectors.ts
