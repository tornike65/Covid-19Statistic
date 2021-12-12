import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CountryPageaActions } from '..//store/actions';
import { AppSelectors } from '..//store/selectors';
import { selectRouteParams } from '..//store/selectors/router.selector';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  countries$ = this.store.select(AppSelectors.getCountries);
  countryByCode$ = this.store.select(AppSelectors.getCountryByCode);
  countryCode = 'GE';
  showSpinner = false;
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.showSpinner = true;
    // მიმდინარე როუტიდან პარამეტრის ამოღება
    this.store.pipe(select(selectRouteParams)).subscribe((params: Params) => {
      if (params) {
        this.countryCode = params.code;
        this.store.dispatch(
          CountryPageaActions.selectCountry({ countryCode: params.code }),
        );
      }
      this.showSpinner = false;
    });
    this.store.dispatch(CountryPageaActions.pageLoad());
  }

  // change ივენთით მონაცემების განახლება გადმოცემული ქვეყნით
  selectCountry(selectedValue: string) {
    this.showSpinner = true;
    this.router.navigate(['countries', selectedValue]);
  }
}
