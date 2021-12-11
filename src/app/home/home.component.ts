import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Timeline } from '../models/Timeline.model';
import { HomePageActions } from '../store/actions';
import { AppSelectors } from '../store/selectors';
import { selectRouteParams } from '../store/selectors/router.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  timeline$?: Observable<Timeline[]>;
  statsAtDate$ = this.store.select(AppSelectors.getTimelineByDate);
  currentDate = moment(new Date()).format('YYYY-MM-DD');
  showSpinner = false;
  constructor(private store: Store, private route: Router) {}

  ngOnInit(): void {
    this.showSpinner = true;
    // მიმდინარე როუტიდან პარამეტრის ამოღება
    this.store.pipe(select(selectRouteParams)).subscribe((params: Params) => {
      if (params) {
        this.store.dispatch(HomePageActions.selectDate({ date: params.date }));

        this.timeline$ = this.store.select(
          AppSelectors.getTimelineByDateForChart
        );
        this.showSpinner = false;
      }
    });
    this.store.dispatch(HomePageActions.pageLoad());
  }

  // თარიღით მონაცემების განახლება
  changeDate(time: any) {
    this.showSpinner = true;
    let formattedDate = moment(time).format('YYYY-MM-DD');
    this.store.dispatch(HomePageActions.selectDate({ date: formattedDate }));
    this.route.navigate(['home', formattedDate]);
  }
}
