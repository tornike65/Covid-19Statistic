import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from 'src/app/services/http.service';
import { ChartComponent } from './chart/chart.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FilterServiceService } from 'src/app/services/filter-service.service';
import { CountriesComponent } from './countries/countries.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from 'src/store/reducers/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from 'src/store/effects/app.effcts';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    HomeComponent,
    NavigationComponent,
    CountriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    StoreModule.forRoot({app:appReducer,router:routerReducer}),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument(),
    RouterModule.forRoot([
        
    ]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [HttpService,FilterServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
