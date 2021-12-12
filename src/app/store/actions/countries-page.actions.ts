import { createAction, props } from '@ngrx/store';

export const selectCountry = createAction(
  '[County Page] Select Country',
  props<{ countryCode: string }>(),
);

export const pageLoad = createAction('[Country Page] Page Load');
