import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {

   }

  public generateToken(loginData:any){
    return this.http.post(`${baseURL}/auth/login`,loginData)
  }
}
