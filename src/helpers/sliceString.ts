export const sliceString = (str, period) => {
    return str ? str.length > period ? `${str.slice(0, period)}...` : str : str;
};


// WEBPACK FOOTER //
// src/drone/src/src/helpers/sliceString.ts
