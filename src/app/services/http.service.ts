import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse } from 'src/app/models/APIResponse.model';
import { Country } from 'src/app/models/Countries.model';
import { Timeline } from 'src/app/models/Timeline.model';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  getStatisticByTime(): Observable<APIResponse<Timeline[]>> {
    return this.httpClient.get<APIResponse<Timeline[]>>(
      `${env.BASE_URL}/timeline`,
    );
  }

  getCountriesInfo(): Observable<APIResponse<Country[]>> {
    return this.httpClient.get<APIResponse<Country[]>>(
      `${env.BASE_URL}/countries`,
    );
  }

  getcountryByCode(countryCode: string): Observable<APIResponse<Country>> {
    return this.httpClient.get<APIResponse<Country>>(
      `${env.BASE_URL}/countries/${countryCode}`,
    );
  }
}
