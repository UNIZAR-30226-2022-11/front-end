import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
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
  GetFriendList(username: any):Observable<any>{
      return this.servicio.get('${this.servidor}/getFriendList', username);
  }

  //Devolver lista de peticiones con los mismos campos que la BD
  // Enviar { "nickname": "<nombre>" }
  // Devolver { "friendRequests": [{string}*] } (solo me interesa el nombre de usuario de las peticiones)
  GetFriendRequests(username: any):Observable<any>{
    return this.servicio.get('${this.servidor}/getFriendRequest', username);
  }

  //Devolver string en los siguientes casos:
  // Enviar { "nickname1": "<nombre del usuario que envia la peticion>", 
  //          "nickname2": "<nombre del usuario que recibe la peticion>" }
  // Devolver { "resultado":string }
  //  "La solicitud se ha mandado correctamente" en caso de exitir
  //  "El usuario no existe" si no existe 
  //  "El usuario existe pero ya es amigo tuyo" en caso de que exista pero sea tu amigo ya
  SendFriendRequest(peticion: any, respuesta: any): Observable<any>{
    return this.servicio.post(this.servidor+"/sendFriendRequest", peticion, respuesta);
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
  Register(username:any, password: any):Observable<any>{
    return this.servicio.post(this.servidor+"/register", username, password);
  }

  //deberia devolver un booleano para saber si ha sido un exito o no
  // Enviar { "nickname": "<nickname>" }
  // Devolver { "exito":boolean, "user": {
  //                               "nickname": "<nickname>",}
  //                               "puntos": "<puntos>",
  //                               "monedas": "<monedas>",
  //                               "avatar": "<avatar>",
  //                               "piezas": "<piezas>",
  //                               "tablero": "<tablero>"} }
  Login(username:any):Observable<any>{
    return this.servicio.get(this.servidor+"/login", username);
  }

  /*getAllPersonajes(): Observable<any>{
    return this.servicio.get(this.servidor);
  }

  saveAllPersonajes(personaje:any): Observable<any>{
    return this.servicio.post(this.servidor, personaje);
  }*/
}
