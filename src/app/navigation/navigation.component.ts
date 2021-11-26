import { Component, Input, OnInit } from '@angular/core';
import { APIResponse } from 'src/models/APIResponse.model';
import { Timeline } from 'src/models/Timeline.model';
import { FilterServiceService } from 'src/services/filter-service.service';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  data: Timeline[] = [];

  constructor(private http: HttpService, private filter: FilterServiceService) {
  }


  ngOnInit(): void {
    this.setDefaultDate();
  }

  // change ივენთით მონაცემების განახლება გადმოცემული თარიღით
  changeDate(time: any) {
    this.http.getStatisticByTime().subscribe((response: APIResponse<Timeline>) => {
      var index = response.data.reverse().findIndex(x => x.date === time)
      this.data = response.data.slice(index);
      this.filter.changeData.emit(this.data);
    })
  }
  // datepicker - ს ვანიჭებთ default მნიშვნელობას 
  setDefaultDate(){
    var date = new Date();
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth() + 1;
    var day = date.getDate();
    var fulldate = `${year}-${month}-${day}`
    return fulldate;
  }


   
}
