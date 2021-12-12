import { createAction, props } from '@ngrx/store';
import { Country } from 'src/app/models/Countries.model';
import { Timeline } from 'src/app/models/Timeline.model';

export const getTimelineSuccses = createAction(
  '[Corona Api] Get Timeline Succses',
  props<{ timeline: Timeline[] }>(),
);

export const getTimelineFailed = createAction(
  '[Corona Api] Get Timeline  Failed',
  props<{ message: string }>(),
);

export const getCountriesSuccses = createAction(
  '[Corona Api] Get Countries Succses',
  props<{ countries: Country[] }>(),
);

export const getCountriesfailed = createAction(
  '[Corona Api] Get Countries Failed',
  props<{ message: string }>(),
);

export const getCountryByCodeSuccses = createAction(
  '[Corona Api] Get Country By Code Succses',
  props<{ country: Country }>(),
);
export const getCountryByCodeFailed = createAction(
  '[Corona Api] Get  Country By Code Failed',
  props<{ message: string }>(),
);
