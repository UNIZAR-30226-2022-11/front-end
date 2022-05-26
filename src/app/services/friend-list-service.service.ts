import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserServiceService } from './user-service.service';
import { amigos } from '../other/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FriendListServiceService {

  servidor1="http://ec2-18-206-137-85.compute-1.amazonaws.com:3000"

  constructor(private servicio:HttpClient) { }

  static friendList: Array<amigos>=[]; //DEJAR LISTA VACIA
  static friendRequests: Array<string>=[]; //DEJAR LISTA VACIA

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
      //return this.servicio.get(this.servidor1+"/getFriendList?nickname="+nickname, {headers});
      return this.servicio.get(this.servidor1+"/getFriendList?nickname="+nickname, {headers});
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
    //return this.servicio.get(this.servidor1+"/getFriendRequest?nickname="+ nickname, {headers});
    return this.servicio.get(this.servidor1+"/getFriendRequest?nickname="+nickname,{headers});
  }

  

    // Devolver true si se ha añadido correctamente el nuevo amigo
  // Enviar { "nickname": "<nickname>",
  //          "request": "<request>"}
  // Devolver { "exito" : "<exito: boolean>"}
  AcceptFriendRequest(nickname:string, amigo:string): Observable<any>{
    const body = {nickname,amigo }
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post(this.servidor1+"/acceptFriendRequest" ,body, {headers});
  }

  // Devolver true si se ha eliminado correctamente la solicitud de amistad
  // Enviar { "nickname": "<nickname>",
  //          "request": "<request>"}
  // Devolver { "exito" : "<exito: boolean>"}
  DeclineFriendRequest(nickname:string, amigo:string): Observable<any>{
    const body = {nickname,amigo }
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post(this.servidor1+"/declineFriendRequest" ,body, {headers});
  }

  getFriendList (){
    this.GetFriendList(UserServiceService.user.nickname).subscribe(datos=>{
      FriendListServiceService.friendList = [];
      for(let i=0;i<datos.friendList.length;i++){
        var amigo: amigos = {
          nickname: datos.friendList[i].valor,
          estado: "offline"
        }
        //FriendListServiceService.friendList.push(datos.friendList[i].valor);
        FriendListServiceService.friendList.push(amigo);
      }
    })
  }

  getFriendRequests (){
    this.GetFriendRequests(UserServiceService.user.nickname).subscribe(datos=>{
      console.log("getfriendrequest")
      FriendListServiceService.friendRequests = [];
      for(let i=0;i<datos.friendRequests.length;i++){
        FriendListServiceService.friendRequests.push(datos.friendRequests[i].valor);
      }
    })
  }

  refreshLists(){
    this.getFriendList();
    this.getFriendRequests();
  }

}
