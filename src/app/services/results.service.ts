import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private Http:HttpClient) { }

  public saveResult(result: any) {
    return this.Http.post(`${baseURL}/results/`, result);
  }

  public getAttempCount(idUser: number,idTest: number) {
    return this.Http.get(`${baseURL}/results/count/user/${idUser}/test/${idTest}`);
  }
}
