import { Injectable } from '@angular/core';
import baseURL from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http:HttpClient) { }

  public listSubjects() {
    return this.http.get(`${baseURL}/subjects/subjectslist`)
  }

  public getsubjectById(subjectId:any) {
    return this.http.get(`${baseURL}/subjects/${subjectId}`)
  }

  public addSubject(subject:any) {
    return this.http.post(`${baseURL}/subjects/add`, subject)
  }

  public updateSubject(subject:any) {
    return this.http.put(`${baseURL}/subjects/update`, subject)
  }

  public deleteSubject(subjectId:any) {
    return this.http.delete(`${baseURL}/subjects/delete/${subjectId}`)
  }
}
