import { createReducer, on } from '@ngrx/store';
import { CoronaApiActions, CountryPageaActions, HomePageActions } from '../actions';
import { AppState } from '../states';

export const initialState: AppState = {

  isLoading: false,
  timeline: [],
  countries: [],
  country: null,
  countryCode: 'GE',
  selectedDate:  new Date().toString(),
  message: '',


};

export const appReducer = createReducer(
  initialState,
  on(HomePageActions.pageLoad, state => ({ ...state, isLoading: true })),
  on(HomePageActions.selectDate, (state, { date }) => ({ ...state, selectedDate: date })),

  on(CountryPageaActions.pageLoad, state => ({ ...state, isLoading: true })),
  on(CountryPageaActions.selectCountry, (state, { countryCode }) => ({ ...state, countryCode:countryCode})),

  on(CoronaApiActions.getTimelineSuccses, (state, { timeline }) => ({ ...state, timeline: timeline, isLoading: false })),
  on(CoronaApiActions.getTimelineFailed, (state, { message }) => ({ ...state, message: message, isLoading: false })),

  on(CoronaApiActions.getCountriesSuccses, (state, { countries }) => ({ ...state, countries: countries, isLoading: false })),
  on(CoronaApiActions.getCountriesfailed, (state, { message }) => ({ ...state, message: message, isLoading: false })),

  on(CoronaApiActions.getCountryByCodeSuccses, (state, { country }) => ({ ...state, country: country, isLoading: false })),
  on(CoronaApiActions.getCountryByCodeFailed, (state, { message }) => ({ ...state, message: message, isLoading: false })),


  );
