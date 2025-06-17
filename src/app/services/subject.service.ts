import { Injectable } from '@angular/core';
import baseURL from './helper';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../interfaces/Subject.interface';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http:HttpClient) { }

  public listSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${baseURL}/subjects/subjectslist`)
  }

  public getsubjectById(subjectId:any): Observable<Subject> {
    return this.http.get<Subject>(`${baseURL}/subjects/${subjectId}`)
  }

  public addSubject(subject:any): Observable<Subject> {
    return this.http.post<Subject>(`${baseURL}/subjects/add`, subject)
  }

  public updateSubject(subject:any): Observable<Subject> {
    return this.http.put<Subject>(`${baseURL}/subjects/update`, subject)
  }

  public deleteSubject(subjectId:any): Observable<any> {
    return this.http.delete<any>(`${baseURL}/subjects/delete/${subjectId}`)
  }
}
