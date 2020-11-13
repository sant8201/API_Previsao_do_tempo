import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { responseToCityWeather, responseToCityDailyWeather } from '../utils/response.utils';
import { CityWeather, CityDailyWeather } from '../models/weather.model';
import { AppState } from '../state/app.reducer';
import { Units } from '../models/units.enum';
import * as fromConfigSelectors from '../state/config/config.selectors';

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements OnDestroy {

  private unit: Units;

  private serviceDestroyed$ = new Subject();

  constructor(private http: HttpClient,
              private store: Store<AppState>) {
    store
      .pipe(
        select(fromConfigSelectors.selectUnitConfig),
        takeUntil(this.serviceDestroyed$),
      )
      .subscribe((unit: Units) => this.unit = unit);
  }

  ngOnDestroy() {
    this.serviceDestroyed$.next();
    this.serviceDestroyed$.unsubscribe();
  }

  //devolve a previsão do tempo da semana toda
  getCityWeatherByQuery(query: string): Observable<CityWeather> {
    const params = new HttpParams({ fromObject: { q: query } });
    return this.doGet<any>('weather', params)
      .pipe(map(response => responseToCityWeather(response)));//O map serve para retornar algo. Cityweather contém as informações da cidade e do clima
  }

  getCityWeatherById(id: string): Observable<CityWeather> {
    const params = new HttpParams({fromObject: {id}});
    return this.doGet<any>('weather', params)
      .pipe(map(response => responseToCityWeather(response)));
  }

  getCityWeatherByCoord(lat: number, lon: number): Observable<CityWeather> {
    const params = new HttpParams({fromObject: {
      lat: lat.toString(),
      lon: lon.toString(),
    }});
    return this.doGet<any>('weather', params)
      .pipe(map(response => responseToCityWeather(response)));
  }

  getWeatherDetails(lat: number, lon: number): Observable<CityDailyWeather> {
    const params = new HttpParams({fromObject: {
      lat: lat.toString(),
      lon: lon.toString(),
      exclude: 'minutely,hourly',
    }});
    return this.doGet<any>('onecall', params)
      .pipe(map(response => responseToCityDailyWeather(response)));
  }

  //Construir a url
  private doGet<T>(url: string, params: HttpParams): Observable<T> {
    params = params.append('appid', environment.apiKey);//adicionando parâmetro com o append
    params = params.append('lang', 'pt_br');//adicionando parâmetro com o append
    if (this.unit !== Units.SI) {
      params = params.append('units', this.unit.toLocaleLowerCase());
    }
    return this.http.get<T>(`https://api.openweathermap.org/data/2.5/${ url }`, { params });
  }
}
