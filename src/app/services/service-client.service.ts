import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceClientService {

  servidor="http://ec2-18-206-137-85.compute-1.amazonaws.com:3000"
  //servidor="http://127.0.0.1:3000" 
  //servidor="https://rickandmortyapi.com/api/character"

  constructor(private servicio:HttpClient) { }

  //Devolver lista de amigos con los mismos campos que la BD
  // Enviar { "nickname": "<nombre>" }
  // Devolver { "friendList": [{string}*] } (solo me interesa el nombre de usuario de los amigos)
  GetFriendList(nickname:string):Observable<any>{
    const body = { nickname}
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
      return this.servicio.post('${this.servidor}/getFriendList', body, {headers});
  }

  //Devolver lista de peticiones con los mismos campos que la BD
  // Enviar { "nickname": "<nombre>" }
  // Devolver { "friendRequests": [{string}*] } (solo me interesa el nombre de usuario de las peticiones)
  GetFriendRequests(nickname: string):Observable<any>{
    const body = { nickname}
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post('${this.servidor}/getFriendRequest',body, {headers});
  }

  //Devolver string en los siguientes casos:
  // Enviar { "nickname1": "<nombre del usuario que envia la peticion>", 
  //          "nickname2": "<nombre del usuario que recibe la peticion>" }
  // Devolver { "resultado":string }
  //  "La solicitud se ha mandado correctamente" en caso de exitir
  //  "El usuario no existe" si no existe 
  //  "El usuario existe pero ya es amigo tuyo" en caso de que exista pero sea tu amigo ya
  SendFriendRequest(nickname1: string, nickname2:string): Observable<any>{
    const body = { nickname1, nickname2}
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post(this.servidor+"/sendFriendRequest", body, {headers});
  }

  //deberia devolver un booleano para saber si ha sido un exito o no
  // Enviar { "nickname": "<nickname>",
  //          "contraseña": "<contraseña>",
  //          "email": "<email>"}
  // Devolver { "exito":boolean, "user": {
  //                               "nickname": "<nickname>",}
  //                               "puntos": "<puntos>",
  //                               "monedas": "<monedas>",
  //                               "avatar": "<avatar>",
  //                               "piezas": "<piezas>",
  //                               "tablero": "<tablero>"} }
  //Devolver usuario creado con los mismos campos que la BD
  Register(nickname:string, contraseña:string, email:string):Observable<any>{
    const body = { nickname, contraseña, email }
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post(this.servidor+"/register",  body, {headers});
  }

  //deberia devolver un booleano para saber si ha sido un exito o no
  // Enviar { "nickname": "<nickname>",
  //          "password": "<password>" }
  // Devolver { "exito":boolean, "user": {
  //                               "nickname": "<nickname>",}
  //                               "puntos": "<puntos>",
  //                               "monedas": "<monedas>",
  //                               "avatar": "<avatar>",
  //                               "piezas": "<piezas>",
  //                               "tablero": "<tablero>"} }
  Login(nickname:string, password:string):Observable<any>{
    const body = { nickname, password }
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post(this.servidor+"/login",body,{headers});
  }

  /*getAllPersonajes(): Observable<any>{
    return this.servicio.get(this.servidor);
  }

  saveAllPersonajes(personaje:any): Observable<any>{
    return this.servicio.post(this.servidor, personaje);
  }*/
}
