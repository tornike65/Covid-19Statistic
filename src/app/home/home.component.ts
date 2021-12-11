import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Timeline } from 'src/app/models/Timeline.model';
import { HomePageActions } from 'src/store/actions';
import { AppSelectors } from 'src/store/selectors';
import { selectRouteParam, selectRouteParams } from 'src/store/selectors/router.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  timeline$ = this.store.select(AppSelectors.getTimeline);
  statsAtDate$ = this.store.select(AppSelectors.getTimelineByDate);
  currentDate = moment(new Date()).format('YYYY-MM-DD');
  
  constructor(private store:Store,private route:Router) { }


  ngOnInit(): void {
    this.store.pipe(select(selectRouteParams)).subscribe((params:Params)=>{
      if(params){
        this.currentDate = params.date;
        this.store.dispatch(HomePageActions.selectDate({date:params.date}))
        this.timeline$ = this.store.select(AppSelectors.getTimelineByDateForChart)
      } else{
        this.store.dispatch(HomePageActions.selectDate({date: moment(new Date()).format('YYYY-MM-DD')}))
      }
    })
    this.store.dispatch(HomePageActions.pageLoad())
  }

  changeDate(time: any) {
    let formattedDate = (moment(time)).format('YYYY-MM-DD')
    this.store.dispatch(HomePageActions.selectDate({ date: formattedDate }));
    this.route.navigate(['home', formattedDate]);
  }
}
