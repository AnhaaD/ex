import {
    CHANGE_LANGUAGE,
} from './constants';

import { customLanguageMap } from '../../../custom/translations';
import {
    ChangeLanguageAction,
} from './actions';

export interface LanguageState {
    lang: string;
    messages: { [pair: string]: string };
}

const defaultLanguage = {
    code: 'en',
};

const currentLang: string = localStorage.getItem('lang_code') || defaultLanguage.code;

export const initialChangeLanguageState: LanguageState = {
    lang: currentLang,
    messages: customLanguageMap[currentLang],
};

export const changeLanguageReducer = (state = initialChangeLanguageState, action: ChangeLanguageAction) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            localStorage.setItem('lang_code', action.payload);
            return {
                lang: action.payload,
                messages: customLanguageMap[action.payload],
             };
        default:
            return state;
    }
};


// WEBPACK FOOTER //
// src/drone/src/src/modules/public/i18n/reducer.ts
