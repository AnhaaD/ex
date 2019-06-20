import { en } from './en';
import { ja } from './ja';
import { pt } from './pt';
import { ru } from './ru';

export type LangType = typeof en;

export const languageMap = {
    default: en,
    en,
    ja,
    pt,
    ru,
};


// WEBPACK FOOTER //
// src/drone/src/src/translations/index.ts
