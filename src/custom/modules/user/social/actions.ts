import {
    GET_PROFILE_ME_DATA,
    GET_PROFILE_ME_FETCH,
    GET_PROFILE_USER_DATA,
    GET_PROFILE_USER_FETCH,
    POST_PROFILE_USER_FETCH,
} from './constants';

import {
    PostUserProfilePayloadInterface,
    SocialUserMeInterface,
    SubscribedUserProfileInterface,
} from './types';

export interface GetProfileMeFetch {
    type: typeof GET_PROFILE_ME_FETCH;
}

export interface GetProfileMeData {
    type: typeof GET_PROFILE_ME_DATA;
    payload: SocialUserMeInterface;
}

export interface GetUserProfileFetch {
    type: typeof GET_PROFILE_USER_FETCH;
    payload: {
        nickname: string;
        period: string;
    };
}

export interface GetUserProfileData {
    type: typeof GET_PROFILE_USER_DATA;
    payload: SubscribedUserProfileInterface;
}

export interface PostUserProfileFetch {
    type: typeof POST_PROFILE_USER_FETCH;
    payload: PostUserProfilePayloadInterface;
}

export type SocialAction = GetProfileMeFetch
    | GetProfileMeData
    | GetUserProfileFetch
    | GetUserProfileData
    | PostUserProfileFetch;

export const getProfileMe = (): GetProfileMeFetch => ({
    type: GET_PROFILE_ME_FETCH,
});

export const getProfileMeData = (payload: GetProfileMeData['payload']): GetProfileMeData => ({
    type: GET_PROFILE_ME_DATA,
    payload,
});

export const getUserProfile = (payload: GetUserProfileFetch['payload']): GetUserProfileFetch => ({
    type: GET_PROFILE_USER_FETCH,
    payload,
});

export const getUserProfileData = (payload: GetUserProfileData['payload']): GetUserProfileData => ({
    type: GET_PROFILE_USER_DATA,
    payload,
});

export const postUserProfile = (payload: PostUserProfileFetch['payload']): PostUserProfileFetch => ({
    type: POST_PROFILE_USER_FETCH,
    payload,
});


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/user/social/actions.ts
