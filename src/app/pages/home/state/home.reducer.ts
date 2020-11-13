import { createReducer, Action, on } from '@ngrx/store'

import * as fromHomeActions from './home.actions';

//Iniciando um novo reducer
export interface HomeState {
  entity: any;
  loading: boolean;
  error: boolean;
}

//Estado inicial da estore
export const homeInitialState: HomeState = {
  entity: undefined,
  loading: false,
  error: false,
}

//Criação do reducer => ele recebe o estado inicial, e o on: recebe o estado e devolve a mudança que fez nele, ele lida com a action
const reducer = createReducer(
  homeInitialState,
  on(fromHomeActions.clearHomeState, () => homeInitialState),
  on(
    fromHomeActions.loadCurrentWeather,
    fromHomeActions.loadCurrentWeatherById,
    state => ({
      ...state,
      loading: true,
      error: false,
    }),
  ),
  on(fromHomeActions.loadCurrentWeatherSuccess, (state, { entity }) => ({
    ...state,
    entity,
    loading: false,
  })),
  on(fromHomeActions.loadCurrentWeatherFailed, state => ({
    ...state,
    loading: false,
    error: true,
  })),
);

export function homeReducer(state: HomeState | undefined, action: Action): HomeState {
  return reducer(state, action);
}
