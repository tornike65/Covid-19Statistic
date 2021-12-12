import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as moment from 'moment';
import { CountriesComponent } from './countries/countries.component';
import { HomeComponent } from './home/home.component';
// სხვა ვერ მოვიფიქრე ვერაფერი რომ default date გადამეცა :(
const date = moment(new Date()).format('YYYY-MM-DD');
const routes: Routes = [
  { path: '', redirectTo: `home/${date}`, pathMatch: 'full' },
  { path: 'home', redirectTo: `home/${date}`, pathMatch: 'full' },
  { path: 'home/:date', component: HomeComponent },
  { path: 'countries/:code', component: CountriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
