import { RootState } from '../../index';
import { GridLayoutState } from './reducer';

export const selectGridLayoutState = (state: RootState): GridLayoutState => state.public.rgl;


// WEBPACK FOOTER //
// src/drone/src/src/modules/public/gridLayout/selectors.ts
