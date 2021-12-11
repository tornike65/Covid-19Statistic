import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as moment from 'moment';
import { AppState } from '../states';

export const appSelector = createFeatureSelector<AppState>('app');

export const getTimelineByDate = createSelector(appSelector, (state) =>
  state.timeline.find((country) => country.date === state.selectedDate)
);

export const getTimelineByDateForChart = createSelector(
  appSelector,
  (state) => {
    if (state.selectedDate === moment(new Date()).format('YYYY-MM-DD')) {
      return state.timeline;
    } else {
      let reverseTimeline = [...state.timeline];
      let index = reverseTimeline
        .reverse()
        .findIndex((x) => x.date === state.selectedDate);
      let data = reverseTimeline.slice(index);
      return data.reverse();
    }
  }
);

export const getTimeline = createSelector(
  appSelector,
  (state) => state.timeline
);

export const getCountryByCode = createSelector(
  appSelector,
  (state) => state.country
);

export const getCountries = createSelector(
  appSelector,
  (state) => state.countries
);
