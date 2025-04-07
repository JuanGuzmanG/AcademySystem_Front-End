import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';
import { Subject } from 'rxjs';
import { WindowService } from './window.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient, private ws:WindowService) {
    
  }

  public generateToken(loginData:any){
    localStorage.clear();
    return this.http.post(`${baseURL}/auth/login`,loginData);
  } 

  public loginUser(token:any){
    localStorage.setItem('token',token);
  }

  public isLoggedIn(){
    if(this.ws.nativeWindow){
      let tokenstr = localStorage.getItem("token");
      if(!tokenstr){
        return false;
      }else{

        const tokenLoad = this.decodeToken(tokenstr);
        if(tokenLoad && tokenLoad.exp * 1000 < Date.now()){
          this.logout();
          return false;
        }
        return true;
      }
    }else{
      return false;
    }
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Token inválido', error);
      return null;
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
    if(this.ws.nativeWindow){
      let userSTR = localStorage.getItem("user");
      if(userSTR !=null){
        return JSON.parse(userSTR);
      }else{
        this.logout();
        return null;
      }
    }else{
      return false;
    }
  }

  getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }  

  public getCurrentUser(){
    return this.http.get(`${baseURL}/users/userlogged`);
  }
}
