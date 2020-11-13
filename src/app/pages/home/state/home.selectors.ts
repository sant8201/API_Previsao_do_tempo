/*
*Utiliazado para pegar as informações da store para mostrar no componente
*/

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from './home.reducer';

export const selectHomeState = createFeatureSelector('home');

//createSelector recebe um selector, que é uma feature e uma função de projeção(recebe o que vai retorna e retorna algo)
export const selectCurrentWeather = createSelector(
  selectHomeState,
  (homeState: HomeState) => homeState.entity,
); 

export const selectCurrentWeatherLoading = createSelector(
  selectHomeState,
  (homeState: HomeState) => homeState.loading,
);

export const selectCurrentWeatherError = createSelector(
  selectHomeState,
  (homeState: HomeState) => homeState.error,
);
