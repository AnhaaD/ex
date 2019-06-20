import {
    CHANGE_COLOR_THEME,
} from './constants';

export interface ChangeColorThemeAction {
    type: string;
    payload: string;
}
export const changeColorTheme = (payload: string): ChangeColorThemeAction => ({
    type: CHANGE_COLOR_THEME,
    payload,
});


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/public/colorTheme/actions.ts
