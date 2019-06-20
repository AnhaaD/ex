import { LayoutGrid } from '../../../components/Grid';
import { defaultLayouts, getLayoutFromLS, resetLayout, saveLayoutToLS } from '../../../helpers/layout';
import { RESET_LAYOUTS, SAVE_LAYOUTS } from './constants';

export interface GridLayoutState {
    layouts: LayoutGrid;
}

export const initialLayoutState: GridLayoutState = {
    layouts: getLayoutFromLS('layouts') || defaultLayouts,
};

export const gridLayoutReducer = (state = initialLayoutState, action) => {
    switch (action.type) {
        case SAVE_LAYOUTS:
            saveLayoutToLS(action.payload.key, action.payload.layouts);
            return {
                layouts: action.payload.layouts,
            };
        case RESET_LAYOUTS:
            resetLayout(action.payload.key);
            return {
                layouts: defaultLayouts,
            };
        default:
            return state;
    }
};


// WEBPACK FOOTER //
// src/drone/src/src/modules/public/gridLayout/reducer.ts
