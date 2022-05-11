import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceClientService {

  servidor1="http://ec2-18-206-137-85.compute-1.amazonaws.com:3001"
  servidor2="http://ec2-18-206-137-85.compute-1.amazonaws.com:3001"

  constructor(private servicio:HttpClient) { }

  //Devolver lista de amigos con los mismos campos que la BD
  // Enviar { "nickname": "<nombre>" }
  // Devolver { "friendList": [{string}*] } (solo me interesa el nombre de usuario de los amigos)
  GetFriendList(nickname:string):Observable<any>{
    //const body = { nickname}
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
      return this.servicio.get(this.servidor2+"/getFriendList?nickname="+nickname, {headers});
  }

  //Devolver lista de peticiones con los mismos campos que la BD
  // Enviar { "nickname": "<nombre>" }
  // Devolver { "friendRequests": [{string}*] } (solo me interesa el nombre de usuario de las peticiones)
  GetFriendRequests(nickname: string):Observable<any>{
    //const body = { nickname}
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.get(this.servidor2+"/getFriendRequest?nickname="+ nickname, {headers});
  }

  //Devolver string en los siguientes casos:
  // Enviar { "nickname": "<nombre del usuario que envia la peticion>", 
  //          "amigo": "<nombre del usuario que recibe la peticion>" }
  // Devolver { "resultado":string }
  //  "La solicitud se ha mandado correctamente" en caso de exitir
  //  "El usuario no existe" si no existe 
  //  "El usuario existe pero ya es amigo tuyo" en caso de que exista pero sea tu amigo ya
  SendFriendRequest(nickname: string, amigo:string): Observable<any>{
    const body = { nickname, amigo}
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post(this.servidor2+"/sendFriendRequest", body, {headers});
  }

  //deberia devolver un booleano para saber si ha sido un exito o no
  // Enviar { "nickname": "<nickname>",
  //          "password": "<password (ya cifrado)>",
  //          "email": "<email>"}
  // Devolver { "exito":boolean, "user": {
  //                               "nickname": "<nickname>",}
  //                               "puntos": "<puntos>",
  //                               "monedas": "<monedas>",
  //                               "avatar": "<avatar>",
  //                               "piezas": "<piezas>",
  //                               "tablero": "<tablero>"} }
  //Devolver usuario creado con los mismos campos que la BD
  Register(nickname:string, password:string, email:string):Observable<any>{
    const body = {nickname, password, email }
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post(this.servidor1+"/register",  body, {headers});
  }

  //deberia devolver un booleano para saber si ha sido un exito o no
  // Enviar { "nickname": "<nickname>",
  //          "password": "<password (ya cifrado)>" }
  // Devolver { "exito":boolean, "user": {
  //                               "nickname": "<nickname>",}
  //                               "puntos": "<puntos>",
  //                               "monedas": "<monedas>",
  //                               "avatar": "<avatar>",
  //                               "piezas": "<piezas>",
  //                               "tablero": "<tablero>"} }
  Login(nickname:string, password:string):Observable<any>{
    //bcrypt
    //const body = { nickname, password }
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.get(this.servidor1+"/login?nickname="+nickname+"&password="+password,{headers});
  }


  //deberia devolver las ultimas 20 partidas
  // empate será true si empataron, falso en cualquier otro caso
  // Ganador será true si quien pide la solicitud ganó la partida, false si la perdió, y indefinido si empataron.
  // Enviar { "nickname": "<nickname>"}
  // Devolver { "matchHistory": [{
  //                            "rival": <nickname: string>,
  //                            "ganador": <ganador: boolean>,
  //                            "empate": <empate: boolean>},
  //                             {
  //                            "rival": <nickname: rival>,
  //                            "ganador": <ganador: boolean>,
  //                            "empate": <empate: boolean>}
  //                            ]* }
  GetMatchHistory(nickname:string): Observable<any>{
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.get(this.servidor1+"/getMatchHistory?nickname="+nickname, {headers});
  }

  // Devolver true si se ha añadido correctamente el nuevo amigo
  // Enviar { "nickname": "<nickname>",
  //          "request": "<request>"}
  // Devolver { "exito" : "<exito: boolean>"}
  AceptFriendRequest(nickname:string, request:string): Observable<any>{
    const body = {nickname,request }
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post(this.servidor1+"/AceptFriendRequest" ,body, {headers});
  }

  // Devolver true si se ha eliminado correctamente la solicitud de amistad
  // Enviar { "nickname": "<nickname>",
  //          "request": "<request>"}
  // Devolver { "exito" : "<exito: boolean>"}
  DeclineFriendRequest(nickname:string, request:string): Observable<any>{
    const body = {nickname,request }
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post(this.servidor1+"/DeclineFriendRequest" ,body, {headers});
  }

  // "result" es un string que puede tomar los valores:
  //        "win": en caso de que <nickname> haya ganado a <rival>,
  //        "lose": en caso de que <nickname> haya perdido ante <rival>,
  //        "draw": en caso de empate
  // "puntos" será la nueva cantidad de puntos del usuario <nickname> // +5 puntos en caso de victoria, +0 en caso de empate o derrota
  // "monedas" será la nueva cantidad de monedas del usuario <nickname> // +1 moneda en caso de victoria, +0 en cualquier otro caso
  // Enviar { "nickname": "<nickname>",
  //          "rival": "<rival>",
  //          "result" "<result:string>"}
  // Devolver { "exito": "<exito: boolean>",
  //            "puntos": "<puntos: integer>",
  //            "monedas": "<monedas: integer>"}
  SaveMatchResult(nickname:string, rival:string, result: string){
    const body = {nickname,rival, result }
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post(this.servidor1+"/SaveMatchResult" ,body, {headers});
  }

  

}
