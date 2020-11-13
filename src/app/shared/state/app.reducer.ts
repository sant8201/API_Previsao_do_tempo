import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { RouterState } from './router/router.reducer';
import { ConfigState, configReducer } from './config/config.reducer';

export interface AppState {
  router: RouterReducerState<RouterState>,
  config: ConfigState,
}
//devolvemos um objeto com a chave e um reducer como valor, pu seja, adcionamos a store
export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  config: configReducer,
};
