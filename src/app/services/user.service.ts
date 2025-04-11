import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  public addUser(User: any){
    return this.httpClient.post(`${baseURL}/auth/new_user`,User);
  }
  public getusers(){
    return this.httpClient.get(`${baseURL}/users/all_users`);
  }
  public deleteUser(userId: any){
    return this.httpClient.delete(`${baseURL}/users/delete/${userId}`); 
  }
}
