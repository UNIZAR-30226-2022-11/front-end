import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocketThree } from '../app.module';
@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  servidor1="http://ec2-18-206-137-85.compute-1.amazonaws.com:3000"

  constructor(private servicio:HttpClient) { }

  crearTorneoPublico(nickname:string):Observable<any>{
    const body = {nickname, codigo:''}
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post(this.servidor1+"/crearTorneo" ,body, {headers});
  } 



  crearTorneoPrivado(nickname:string, codigo:string):Observable<any>{
    const body = {nickname, codigo}
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post(this.servidor1+"/crearTorneo" ,body, {headers});
  } 

  borrarTorneo(nickname:string):Observable<any>{
    const body = {nickname}
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.post(this.servidor1+"/borrarTorneo" ,body, {headers});
  } 

  obtenerTorneosPublicos():Observable<any>{
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.get(this.servidor1+"/obtenerTorneos", {headers});
  }

  entrarTorneo(nickname: string):Observable<any>{  
    const body = {nickname}
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.get(this.servidor1+"/entrarTorneo", {headers});
  }

  comprobarCodigoTorneo(codigo:string):Observable<any>{
    const body = {codigo}
    const headers = new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
    return this.servicio.get(this.servidor1+"/obtenerTorneos", {headers});
  }
 
}
