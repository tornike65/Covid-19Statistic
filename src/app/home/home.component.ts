import { Component, OnInit } from '@angular/core';
import { APIResponse } from 'src/models/APIResponse.model';
import { Timeline } from 'src/models/Timeline.model';
import { FilterServiceService } from 'src/services/filter-service.service';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  timeData: Timeline[] = [];
  
  constructor(private http: HttpService, private filter: FilterServiceService) { }


  ngOnInit(): void {
    if (this.timeData.length < 1) {
      this.filter.changeData.subscribe(filteredData => {
        this.timeData = filteredData;
      })
    }

    this.getDataByTime()
  }

  getDataByTime() {
    this.http.getStatisticByTime().subscribe((response: APIResponse<Timeline>) => {
      this.timeData = response.data;
    })
  }

}
