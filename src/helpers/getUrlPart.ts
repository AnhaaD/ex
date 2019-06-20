export const getUrlPart = (index: number, url: string): string => {
    const part = url.split(/[\/#?]/)[index];
    return part ? part : '';
};


// WEBPACK FOOTER //
// src/drone/src/src/helpers/getUrlPart.ts
