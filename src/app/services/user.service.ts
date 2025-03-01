import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  public addUser(User: any){
    return this.httpClient.post(`${baseURL}/users/new_user`,User);
  }
}
