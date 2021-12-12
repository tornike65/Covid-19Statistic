import { createAction, props } from '@ngrx/store';
import { Country } from '../../models/Countries.model';
import { Timeline } from '../../models/Timeline.model';

export const getTimelineSuccsess = createAction(
  '[Corona Api] Get Timeline Succsess',
  props<{ timeline: Timeline[] }>(),
);

export const getTimelineFailed = createAction(
  '[Corona Api] Get Timeline  Failed',
  props<{ message: string }>(),
);

export const getCountriesSuccsess = createAction(
  '[Corona Api] Get Countries Succsess',
  props<{ countries: Country[] }>(),
);

export const getCountriesfailed = createAction(
  '[Corona Api] Get Countries Failed',
  props<{ message: string }>(),
);

export const getCountryByCodeSuccsess = createAction(
  '[Corona Api] Get Country By Code Succsess',
  props<{ country: Country }>(),
);
export const getCountryByCodeFailed = createAction(
  '[Corona Api] Get Country By Code Failed',
  props<{ message: string }>(),
);
