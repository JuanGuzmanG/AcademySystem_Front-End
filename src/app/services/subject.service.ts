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

  public addSubject(subject:any) {
    return this.http.post(`${baseURL}/subjects/add`, subject)
  }
}
