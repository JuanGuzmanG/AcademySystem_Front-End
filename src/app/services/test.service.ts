import { Injectable } from '@angular/core';
import baseURL from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) { }

  public getTestBySubject(subjectId:any){
    return this.http.get(`${baseURL}/test/subject/${subjectId}`);
  }
  public listTests() {
    return this.http.get(`${baseURL}/test/testlist`);
  }

  public listTestByState() {
    return this.http.get(`${baseURL}/test/active`);
  }
  public listTestsBySubjectId(subjectId: any) {
    return this.http.get(`${baseURL}/test/active/${subjectId}`);  
  }

  public getTest(testId: any) {
    return this.http.get(`${baseURL}/test/${testId}`);
  }
  public addTest(test: any) {
    return this.http.post(`${baseURL}/test/add`, test);
  }
  public updateTest(test: any) {
    return this.http.put(`${baseURL}/test/update`, test);
  }
  public deleteTest(testId: any) {
    return this.http.delete(`${baseURL}/test/delete/${testId}`);
  }
}
