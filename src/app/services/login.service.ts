import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {

  }

  public generateToken(loginData:any){
    return this.http.post(`${baseURL}/auth/login`,loginData);
  } 

  public loginUser(token:any){
    localStorage.setItem('token',token);
  }

  public isLoggedIn(){
    let tokenstr = localStorage.getItem("token");
    if(tokenstr==undefined || tokenstr=="" || tokenstr){
      return false;
    }else{
      return true;
    }
  }

  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  public getToken(){
    return localStorage.getItem("token");
  }

  public setUser(user:any){
    localStorage.setItem("user",JSON.stringify(user));
  }

  public getUser(){
    let userSTR = localStorage.getItem("user");
    if(userSTR !=null){
      return JSON.parse(userSTR);
    }else{
      this.logout();
      return null;
    }
  }

  getUserRole(){
    let user = this.getUser();
    return user.authorities[0].autority;
  }

  public getCurrentUser(){
    return this.http.get(`${baseURL}/users/userlogged`);
  }
}
