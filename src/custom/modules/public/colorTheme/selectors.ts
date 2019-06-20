import { RootState } from '../../../../modules';
import { ColorThemeState } from './reducer';

export const selectCurrentColorTheme = (state: RootState): ColorThemeState['color'] => state.customPublic.colorTheme.color;


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/public/colorTheme/selectors.ts
