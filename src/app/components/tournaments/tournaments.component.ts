import { Component, OnInit } from '@angular/core';
import { usuario } from 'src/app/other/interfaces';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  

  players:number = 1; 
  static privado: boolean;
  codigo:string ="GALKGSD";

  jugador1: usuario = UserServiceService.user;
  jugador2: usuario = {nickname:"Ines", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""}
  jugador3: usuario = {nickname:"Maria", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""}
  jugador4: usuario = {nickname:"Mariano", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""}
  finalista1: usuario = {nickname:"Ernesto", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""}
  finalista2: usuario = {nickname:"Mariano", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""}
  ganador: usuario = {nickname:"Ernesto", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""}
  

  constructor() { }

  ngOnInit(): void {
    if (this.getPrivate){
      this.codigo = this.makeid();
    }
    
  }

  static crearTorneo(privado: boolean) {
    this.privado = privado;
  }

  get getPrivate(){
    return TournamentsComponent.privado
  }

  sumar(){
    this.players = this.players + 1;
  }

  ngOnDestroy(){
    //cerrar torneo
    console.log("cerrarTorneo")
  }

  startTournament(){
    console.log(this.players);
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  


}
