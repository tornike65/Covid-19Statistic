import { createReducer, on, State } from "@ngrx/store";
import { Country } from "src/app/models/Countries.model";
import { Timeline } from "src/app/models/Timeline.model";
import state from "sweetalert/typings/modules/state";
import { CoronaApiActions, CountryPageaActions, HomePageActions } from "../actions";
import { selectDate, pageLoad } from '../actions/home-page.actions'
import { AppState } from "../states";

export const initialState: AppState = {

  isLoading: false,
  timeline: [],
  countries: [],
  country: null,
  countryCode: "GE",
  selectedDate:  new Date().toString(),
  message: ""


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