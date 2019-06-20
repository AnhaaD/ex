import { PG_TITLE_PREFIX } from '../constants';

export const setDocumentTitle = (title: string): void => {
    document.title = [PG_TITLE_PREFIX, title].join(': ');
};


// WEBPACK FOOTER //
// src/drone/src/src/helpers/setDocumentTitle.ts
