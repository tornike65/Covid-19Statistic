import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { CountriesComponent } from './countries/countries.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'home/:date' , component: HomeComponent},
  {path:'' , redirectTo : 'home/:date', pathMatch: 'full'},
  {path:'countries/:code' , component: CountriesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
