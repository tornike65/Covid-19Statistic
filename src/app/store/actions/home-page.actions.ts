import { createAction, props } from '@ngrx/store';


export const selectDate = createAction('[Home Page Statistic] SelectDate',
    props<{ date: string }>()
);

export const pageLoad = createAction('[Home Page Statistic] Page Load');
