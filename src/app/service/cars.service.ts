import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

export interface ICars {
  mark: string,
  model: string,
  year: string
}

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  baseUrl = 'http://localhost:3001'

  constructor(private http:HttpClient) { }

  getCars(): Observable<Array<ICars>>{
    return this.http.get<Array<ICars>>(this.baseUrl + '/cars')
  }

  regCar(data){
    return this.http.post(this.baseUrl + '/reg-car', data)
  }

}


