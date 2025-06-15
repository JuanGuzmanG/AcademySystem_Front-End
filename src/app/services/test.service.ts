import { Injectable } from '@angular/core';
import baseURL from './helper';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from '../interfaces/Test.interface';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) { }

  public getTestBySubject(subjectId:any): Observable<Test[]> {
    return this.http.get<Test[]>(`${baseURL}/test/subject/${subjectId}`);
  }
  public listTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${baseURL}/test/testlist`);
  }

  public listTestByState(): Observable<Test[]> {
    return this.http.get<Test[]>(`${baseURL}/test/active`);
  }
  public listTestsBySubjectId(subjectId: any): Observable<Test[]>{
    return this.http.get<Test[]>(`${baseURL}/test/active/${subjectId}`);  
  }

  public getTest(testId: number): Observable<Test> {
    return this.http.get<Test>(`${baseURL}/test/${testId}`);
  }
  public addTest(test: any): Observable<Test> {
    return this.http.post<Test>(`${baseURL}/test/add`, test);
  }
  public updateTest(test: any): Observable<Test> {
    return this.http.put<Test>(`${baseURL}/test/update`, test);
  }
  public deleteTest(testId: any): Observable<any> {
    return this.http.delete<any>(`${baseURL}/test/delete/${testId}`);
  }
}
