import { RootState } from '../../../../modules';
import { SocialUserMeInterface } from './types';

export const selectSocialUsersMe = (state: RootState): SocialUserMeInterface | undefined =>
    state.customUser.social.me;

export const selectSocialLoading = (state: RootState): boolean =>
    state.customUser.social.loading;

// tslint:disable-next-line:no-any
export const selectSocialProfileUser = (state: RootState): any =>
    state.customUser.social.userSocial;


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/user/social/selectors.ts
