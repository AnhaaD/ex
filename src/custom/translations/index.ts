import { en } from './en';
import { ja } from './ja';
import { ko } from './ko';
import { pt } from './pt';
import { ru } from './ru';

export type LangType = typeof en;

export const customLanguageMap = {
    default: en,
    en,
    ja,
    ko,
    pt,
    ru,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/translations/index.ts
