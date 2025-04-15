import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private Http:HttpClient) { }

  public getAllRols(){
    return this.Http.get("http://localhost:8080/rols/all");
  }

  public getRol(idRol:any){
    return this.Http.get(`http://localhost:8080/rols/${idRol}`);
  }
}
