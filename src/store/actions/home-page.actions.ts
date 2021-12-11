import { createAction, props } from '@ngrx/store'
import { APIResponse } from 'src/app/models/APIResponse.model';
import { Timeline } from 'src/app/models/Timeline.model';


export const selectDate = createAction('[Home Page Statistic] SelectDate',
    props<{ date: string }>()
);

export const pageLoad = createAction('[Home Page Statistic] Page Load');