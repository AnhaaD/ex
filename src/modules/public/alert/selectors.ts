import { RootState } from '../../index';
import { AlertState } from './reducer';

export const selectAlertState = (state: RootState): AlertState => state.public.alerts;


// WEBPACK FOOTER //
// src/drone/src/src/modules/public/alert/selectors.ts
