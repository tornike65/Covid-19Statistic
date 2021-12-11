import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CountryPageaActions } from 'src/store/actions';
import { AppSelectors } from 'src/store/selectors';
import { selectRouteParams } from 'src/store/selectors/router.selector';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit{
  countries$ = this.store.select(AppSelectors.getCountries)
  countryByCode$ = this.store.select(AppSelectors.getCountryByCode)
  countryCode = 'GE';
  constructor(private store: Store, private router: Router,private renderer:Renderer2) { }

  ngOnInit(): void {

    this.store.pipe(select(selectRouteParams)).subscribe((params:Params)=>{
      if(params){
        this.store.dispatch(CountryPageaActions.selectCountry({countryCode:params.code}));
      }
    })
    this.store.dispatch(CountryPageaActions.pageLoad());

  }

  // change ივენთით მონაცემების განახლება გადმოცემული ქვეყნით
  selectCountry(selectedValue: string) {
    this.router.navigate(["countries", selectedValue])
  }
}
