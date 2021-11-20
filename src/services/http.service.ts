import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse} from 'src/models/APIResponse.model';
import { Countries } from 'src/models/Countries.model';
import { Timeline } from 'src/models/Timeline.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient:HttpClient) { }

  getStatisticByTime() : Observable<APIResponse<Timeline>> {
    return this.httpClient.get<APIResponse<Timeline>>(`${env.BASE_URL}/timeline`);
  }
 
  getCountriesInfo():Observable<APIResponse<Countries>>{
    return this.httpClient.get<APIResponse<Countries>>(`${env.BASE_URL}/countries`);
  }

  getcountryByCode(countryCode:string) :Observable<Countries>{
    return this.httpClient.get<Countries>(`${env.BASE_URL}/countries/${countryCode}`);
  } 
}
