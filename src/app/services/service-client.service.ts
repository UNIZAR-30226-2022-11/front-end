import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ServiceClientService {

  //servidor="http://ec2-18-206-137-85.compute-1.amazonaws.com:3000"
  servidor="http://127.0.0.1:3000" 
  //servidor="https://rickandmortyapi.com/api/character"

  constructor(private servicio:HttpClient) { }

  GetFriendList(username: any):Observable<any>{
      return this.servicio.get('${this.servidor}/', username);
  }

  GetFriendRequests(username: any):Observable<any>{
    return this.servicio.get('${this.servidor}/', username);
  }

  SendFriendRequest(username1: any, username2: any): Observable<any>{
    return this.servicio.post('${this.servidor}/', username1, username2);
  }

  //deberia devolver un booleano para saber si ha sido un exito o no
  Register(username:any, password: any):Observable<any>{
    return this.servicio.post('${this.servidor}/register', username, password);
  }

  //deberia devolver un booleano para saber si ha sido un exito o no
  Login(username:any, password:any):Observable<any>{
    return this.servicio.post('${this.servidor}/login', username, password);
  }

  /*getAllPersonajes(): Observable<any>{
    return this.servicio.get(this.servidor);
  }

  saveAllPersonajes(personaje:any): Observable<any>{
    return this.servicio.post(this.servidor, personaje);
  }*/
}
