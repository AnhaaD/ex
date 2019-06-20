export const checkFavoritesName = (name: string): true | false  =>
    localStorage.getItem(`favorites.${name}`) ? true : false;


// WEBPACK FOOTER //
// src/drone/src/src/custom/helpers/checkFavoritesName.ts
