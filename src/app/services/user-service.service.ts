import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { usuario } from '../other/interfaces';
import * as bcrypt from 'bcryptjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FriendListComponent } from '../components/friend-list/friend-list.component';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  servidor1="http://ec2-18-206-137-85.compute-1.amazonaws.com:3000"

  constructor(private servicio:HttpClient) { }

  public static logged: boolean = false;
  public static user: usuario ={ nickname: "",
                        puntos: 0,
                        monedas: 0,
                        avatar: "",
                        piezas: "",
                        tablero: ""
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

  

}
