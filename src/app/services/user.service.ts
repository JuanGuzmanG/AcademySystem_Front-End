import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  public get(userId: any){
    return this.httpClient.get(`${baseURL}/users/get_user_${userId}`);

  }
  public addUser(User: any){
    return this.httpClient.post(`${baseURL}/auth/new_user`,User);
  }
  public getusers(){
    return this.httpClient.get(`${baseURL}/users/all_users`);
  }
  public updateUser(user:any){
    return this.httpClient.put(`${baseURL}/users/update`,user);
  }
  public deleteUser(userId: any){
    return this.httpClient.delete(`${baseURL}/users/delete/${userId}`); 
  }
}
