import {
    SocialAction,
} from './actions';
import {
    GET_PROFILE_ME_DATA,
    GET_PROFILE_ME_FETCH,
    GET_PROFILE_USER_DATA,
    GET_PROFILE_USER_FETCH,
    POST_PROFILE_USER_FETCH,
} from './constants';
import {
    SocialUserMeInterface,
    SubscribedUserProfileInterface,
} from './types';

export interface SocialState {
    loading: boolean;
    me?: SocialUserMeInterface;
    userSocial?: SubscribedUserProfileInterface;
}

export const initialSocialState: SocialState = {
    loading: false,
};

export const socialReducer = (state = initialSocialState, action: SocialAction) => {
    switch (action.type) {
        case GET_PROFILE_ME_FETCH:
            return {
                ...state,
                loading: true,
                me: undefined,
            };
        case GET_PROFILE_ME_DATA:
            return {
                ...state,
                loading: false,
                me: action.payload,
            };
        case GET_PROFILE_USER_FETCH:
            return {
                ...state,
                loading: true,
                userSocial: undefined,
            };
        case GET_PROFILE_USER_DATA:
            return {
                ...state,
                loading: false,
                userSocial: action.payload,
            };
        case POST_PROFILE_USER_FETCH:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/user/social/reducer.ts
