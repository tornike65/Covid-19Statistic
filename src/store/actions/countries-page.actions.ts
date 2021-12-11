import { createAction, props } from '@ngrx/store'
import { Country } from 'src/app/models/Countries.model';

export const selectCountry = createAction('[County Page] SelectCountry',
props<{countryCode:string}>()
);

export const pageLoad = createAction('[Country Page Load] Page Load');

