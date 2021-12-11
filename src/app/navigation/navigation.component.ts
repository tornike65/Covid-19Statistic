import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { HomePageActions } from 'src/store/actions';
import { AppSelectors } from 'src/store/selectors';
import { selectRouteParams } from 'src/store/selectors/router.selector';
import * as moment from 'moment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor(private router:Router) {}
  

  ngOnInit(): void {}


  homePage(){
   this.router.navigate(['home',moment(new Date()).format('YYYY-MM-DD')])
  }
}
