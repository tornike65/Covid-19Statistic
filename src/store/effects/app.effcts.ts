import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { HttpService } from "src/app/services/http.service";
import { CoronaApiActions, CountryPageaActions, HomePageActions } from "../actions";
import { concatMap, map, catchError } from 'rxjs/operators'
import { Country } from "src/app/models/Countries.model";

@Injectable()
export class AppEffects {

    
    loadTimeline$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HomePageActions.pageLoad),
            concatMap(() =>
                this.httpService
                    .getStatisticByTime()
                    .pipe(
                        map((response) =>
                            CoronaApiActions.getTimelineSuccses({ timeline: response.data })
                        )
                    )
            ),
            catchError((error, caught) => {
                this.store.dispatch(
                    CoronaApiActions.getTimelineFailed({ message: error.error })
                );
                return caught;
            })
        )
    );


    loadCountries$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CountryPageaActions.pageLoad),
            concatMap(() =>
                this.httpService
                    .getCountriesInfo()
                    .pipe(
                        map((response) =>
                            CoronaApiActions.getCountriesSuccses({ countries: response.data })
                        )
                    )
            ),
            catchError((error, caught) => {
                this.store.dispatch(
                    CoronaApiActions.getCountriesfailed({ message: error.error })
                );
                return caught;
            })
        )
    );

    loadCountryByCode$ = createEffect(() =>
    this.actions$.pipe(
        ofType(CountryPageaActions.selectCountry),
        concatMap((action) =>
            this.httpService
                .getcountryByCode(action.countryCode)
                .pipe(
                    map((response) =>
                        CoronaApiActions.getCountryByCodeSuccses({country : response.data })
                    )
                )
        ),
        catchError((error, caught) => {
            this.store.dispatch(
                CoronaApiActions.getCountryByCodeFailed({ message: error.error })
            );
            return caught;
        })
    )
);

    constructor(private actions$: Actions, private store: Store,
        private httpService: HttpService) { }

}
