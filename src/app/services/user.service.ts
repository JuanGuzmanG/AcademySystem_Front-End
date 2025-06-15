import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  public get(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${baseURL}/users/get_user_${userId}`);
  }
  public addUser(user: User, photoFile?: File): Observable<any> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    if (photoFile) {
      formData.append('file', photoFile, photoFile.name);
    }
    return this.httpClient.post(`${baseURL}/auth/new_user`,formData);
  }
  public getusers(){
    return this.httpClient.get(`${baseURL}/users/all_users`);
  }
  public updateUser(user:User, photoFile?: File): Observable<any> {
    const formData = new FormData();
    const userToUpdate = {...user};
    
    formData.append('user', JSON.stringify(userToUpdate));
    if (photoFile) {
      formData.append('file', photoFile, photoFile.name);
    }
    return this.httpClient.put(`${baseURL}/users/update`,formData);
  }
  public deleteUser(userId: any){
    return this.httpClient.delete(`${baseURL}/users/delete/${userId}`); 
  }
}
