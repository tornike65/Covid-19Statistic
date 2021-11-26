import { AfterViewInit, Component,OnInit,} from '@angular/core';
import { APIResponse } from 'src/models/APIResponse.model';
import { Countries } from 'src/models/Countries.model';
import { Timeline } from 'src/models/Timeline.model';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries: Countries[] = [];
  timeline: Timeline[] = [];
  currentCountry?:any;

  constructor(private http: HttpService) { }
  ngOnInit(): void {
   this.defaultCountry("ge")
    this.getCountries();
  }


  // ქვეყნების მონაცემები, ანბანით სორტირებული
  getCountries() {
    this.http.getCountriesInfo().subscribe((response: APIResponse<Countries>) => {
      var index = response.data.reverse().findIndex(x => x.code == "GE")
      response.data.splice(index,1);
      this.countries = response.data.sort((a,b) => (a.name > b.name ? 1 : -1))
    })
  }


  // change ივენთით მონაცემების განახლება გადმოცემული ქვეყნით
  selectCountry(selectedValue: string) {
    this.http.getcountryByCode(selectedValue).subscribe((response: Countries) => {
      this.currentCountry = response;
      this.timeline = this.currentCountry.data.timeline;
    })
  }
   
  defaultCountry(selectedValue:string){
    this.http.getcountryByCode(selectedValue).subscribe((response: Countries) => {
      this.currentCountry = response;
      this.timeline = this.currentCountry.data.timeline;
    })
  }

}
