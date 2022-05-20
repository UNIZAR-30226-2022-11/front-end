import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceClientService {

  servidor1="http://ec2-18-206-137-85.compute-1.amazonaws.com:3000"
  servidor2="http://ec2-18-206-137-85.compute-1.amazonaws.com:3000"

  constructor(private servicio:HttpClient) { }

  

 
  /*
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
    const body = { nickname, password }
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post(this.servidor1+"/login", body, {headers});
  }*/


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
    return this.servicio.post(this.servidor1+"/getFriendRequest", body, {headers});
  }

  // "result" es un string que puede tomar los valores:
  //        "win": en caso de que <nickname> haya ganado a <rival>,
  //        "lose": en caso de que <nickname> haya perdido ante <rival>,
  //        "draw": en caso de empate
  // Enviar { "nickname": "<nickname>",
  //          "rival": "<rival>",
  //          "result" "<result:string>"}
  // Devolver { "exito": "<exito: boolean>"}
  SaveMatchResult(nickname:string, rival:string, result: string): Observable<any>{
    const body = {nickname,rival, result }
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post(this.servidor1+"/saveMatchResult" ,body, {headers});
  }

  // Se debe devolver una lista de 7 elementos ordenada por posicion ascendente / puntos descendente (el resultado es el mismo)
  // que contenga los 3 usuarios por encima y por debajo en el raking del usuario <nickname>.  
  // Tambien debe incluir el <position>, <username> y <points> del usuario <nickname> entre los 3 de encima y de debajo.
  // En el caso de que no hayan 3 jugadores por encima y/o por debajo de <nickname> se podrá devolver una lista de tamaño inferior a 7.
  // Enviar { "nickname": "<nickname>"} position: number;
  // Devolver { "rankingList": [{
  //                            "position": <position: number>,
  //                            "username": <username: string>,
  //                            "points": <points: number>},
  //                            {
  //                            "position": <position: number>,
  //                            "username": <username: string>,
  //                            "points": <points: number>}
  //                            ]* }
  GetRankingList(nickname: string): Observable<any>{
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.get(this.servidor1+"/getRankingList?nickname="+nickname , {headers});
  }

  // Enviar { "nickname": "<nickname>"}
  // Devolver { "points": "<points: number>"}
  GetPoints(nickname: string): Observable<any>{
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.get(this.servidor1+"/getPoints?nickname="+nickname , {headers});
  }

  // Enviar { "nickname": "<nickname>"}
  // Devolver { "coins": "<coins: number>"}
  GetCoins(nickname: string): Observable<any>{
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.get(this.servidor1+"/getCoins?nickname="+nickname , {headers});
  }


  // Devuelve los todos los items que posee el user <nickname>, ya sean de tipo "table", "pieces" o "avatar"
  // Enviar { "nickname": "<nickname>"}
  // Devolver { "articulos": [{
  //                            "nombre": <nombre: string>,
  //                            "tipo": <tipo: string>},
  //                            {
  //                            "nombre": <nombre: string>,
  //                            "tipo": <tipo: string>}
  //                            ]*}
  GetInventary(nickname: string): Observable<any>{
    const body = { nickname}
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post(this.servidor1+"/getInventary" ,body, {headers});
  }
  /*
  GetInventary(nickname: string): Observable<any>{
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.get(this.servidor1+"/getInventary?nickname="+nickname , {headers});
  }*/

  // Devuelve los todos los items que no posee el user <nickname>, ya sean de tipo "table", "pieces" o "avatar"
  // Enviar { "nickname": "<nickname>"}
  // Devolver { "articulos": [{
  //                            "nombre": <nombre: string>,
  //                            "precio": <precio: number>,
  //                            "tipo": <tipo: string>}
  //                            {
  //                            "nombre": <nombre: string>,
  //                            "precio": <precio: number>,
  //                            "tipo": <tipo: string>}
  //                            ]*}
  GetShop(nickname: string): Observable<any>{
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.get(this.servidor1+"/getShop?nickname="+nickname , {headers});
  }

  // Devolverá true si tiene suficiente monedas para pagar ese articulo.
  // En ese caso se descontaran esas monedas del usuario <nickname> y ese articulo pasará
  // a ser de su posesion
  // Enviar { "nickname": "<nickname>" ,
  //          "nombre": "<nombre>",
  //          "tipo": "<tipo>"}
  // Devolver{"exito": "<exito: boolean>"}
  BuyItem(nickname: string, nombre:string, tipo:string): Observable<any>{
    const body = {nickname,nombre, tipo }
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post(this.servidor1+"/buyItem" ,body, {headers});
  }

  // Actualiza el tablero del usuario <nickname>
  // Enviar { "nickname": "<nickname:string>",
  //          "table": "<table:string>"}
  // Devolver { "exito": "<exito:boolean>" }
  UpdateTable(nickname:string, table:string): Observable<any>{
    const body = {nickname, table }
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post(this.servidor1+"/updateTable" ,body, {headers});
  }

  // Actualiza las piezas del usuario <nickname>
  // Enviar { "nickname": "<nickname:string>",
  //          "pieces": "<pieces:string>"}
  // Devolver { "exito": "<exito:boolean>" }
  UpdatePieces(nickname:string, pieces:string): Observable<any>{
    const body = {nickname, pieces }
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post(this.servidor1+"/updatePieces" ,body, {headers});
  }

  // Actualiza el avatar del usuario <nickname>
  // Enviar { "nickname": "<nickname:string>",
  //          "avatar": "<avatar:string>"}
  // Devolver { "exito": "<exito:boolean>" }
  UpdateAvatar(nickname:string, avatar:string): Observable<any>{
    const body = {nickname, avatar }
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post(this.servidor1+"/updateAvatar" ,body, {headers});
  }

}
