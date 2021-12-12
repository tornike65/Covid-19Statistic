import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as moment from 'moment';
import { AppState } from '../states';

export const appSelector = createFeatureSelector<AppState>('app');

// მიმდინარე თარიღით სტატისტიკის ამოღება ქარდების გენრეციისთვის home page-ზე
// აბრუნებს ერთ ობიექტს
export const selectTimelineByDate = createSelector(appSelector, (state) =>
  state.timeline.find((country) => country.date === state.selectedDate),
);

// თარიღით სტატისტიკის ამოღება Line-ჩარტის გენრეციისთვის home page-ზე
// აბრუნებს მასივს
export const selectTimelineByDateForChart = createSelector(
  appSelector,
  (state) => {
    // თარიღით შედარება აბარუნებს მთლიან სტატისტიკას დაწყების დღიდან დღემდე
    // ეს შედარება რომ არ იყოს ბრუნდება მხოლოდ მიმნდინარე დღის მონაცემი რაც ჩარტზე ცუდად ჩანს :)
    // momentis გამოყენება საჭიროა იმისთვის რომ შედარებისთვის თარიღი დავაფორმატოთ ისე როგორც თარიღი გადმოგვეცემა.
    // მაგ:2021-12-10 წელი,თვე რიცხვი
    if (state.selectedDate === moment(new Date()).format('YYYY-MM-DD')) {
      return state.timeline;
    } else {
      // გადმოცემული თარიღის ინდექის ამოღება
      const index = state.timeline.findIndex(
        (x) => x.date === state.selectedDate,
      );
      // ინდექსის მიხედვით ინფორმაციის ამოღება გადმოცემული თარიღიდან მიმდინარე თარიღამდე
      const data = state.timeline.slice(index);
      return data;
    }
  },
);

// ქვეყნის ინფორმაციის ამოღება გადმოცემული ქვეყნის კოდით
export const selectCountryByCode = createSelector(
  appSelector,
  (state) => (state.country)
);

// ქვეყნების ჩამოთვალის ამოღება
export const selectCountries = createSelector(
  appSelector,
  (state) => state.countries,
);

// loader-ის სტატუსის ამოღება
export const selectLoadingStatus = createSelector(
  appSelector,
  (state) => state.isLoading,
);
