import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor(private router: Router) {}


  ngOnInit(): void {
    {}
  }


  homePage(){
   this.router.navigate(['home',moment(new Date()).format('YYYY-MM-DD')]);
  }
}
