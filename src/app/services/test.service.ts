import { Injectable } from '@angular/core';
import baseURL from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) { }

  public listTests() {
    return this.http.get(`${baseURL}/test/testlist`);
  }
  public addTest(test: any) {
    return this.http.post(`${baseURL}/test/add`, test);
  }
  public deleteTest(testId: any) {
    return this.http.delete(`${baseURL}/test/delete/${testId}`);
  }
  public getTest(testId: any) {
    return this.http.get(`${baseURL}/test/${testId}`);
  }
  public updateTest(test: any) {
    return this.http.put(`${baseURL}/test/update`, test);
  }
}
