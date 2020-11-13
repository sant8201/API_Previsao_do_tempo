/*
*Uma ação é capturada pelo reducer e faz manipulação da store
*Ao criar uma ação, passamos qual foi é feature que vai disparar a ação e as props
*/
import { createAction, props } from '@ngrx/store';

import { Bookmark } from 'src/app/shared/models/bookmark.model';

//Ação disparada ao clicar no botão de pesquisar
export const loadCurrentWeather = createAction(
  '[Home] Load Current Weather',//feature que vai ler
  props<{ query: string }>(),//props recebidasv 
);

export const loadCurrentWeatherById = createAction(
  '[Home] Load Current Weather By Id',
  props<{ id: string }>(),
);

export const loadCurrentWeatherSuccess = createAction(
  '[Weather API] Load Current Weather Success',//Quem vai disparar essa action é a response da api
  props<{ entity: any }>(),
);

export const loadCurrentWeatherFailed = createAction(
  '[Weather API] Load Current Weather Failed',
);

export const toggleBookmark = createAction(
  '[Home] Toggle Bookmark',
  props<{ entity: Bookmark }>(),
);

export const clearHomeState = createAction('[Home] Clear Home State');
