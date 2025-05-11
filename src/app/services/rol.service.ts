import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private Http:HttpClient) { }

  public getAllRols(){
    return this.Http.get(`${baseURL}/rols/all`);
  }

  public getRol(idRol:any){
    return this.Http.get(`${baseURL}/rols/${idRol}`);
  }
}
