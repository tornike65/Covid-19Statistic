import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterServiceService {

  constructor() { }
  
  changeData:EventEmitter<any[]> = new EventEmitter();
}
