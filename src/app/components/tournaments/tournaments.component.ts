import { Component, OnInit } from '@angular/core';
import { usuario } from 'src/app/other/interfaces';
import { SocketTournaments } from 'src/app/services/socket.service';
import { TournamentsService } from 'src/app/services/tournaments-service.service';
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
  static propietario: boolean = false;

  jugador1: usuario = UserServiceService.user;
  jugador2: usuario = {nickname:"Ines", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""}
  jugador3: usuario = {nickname:"Maria", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""}
  jugador4: usuario = {nickname:"Mariano", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""}
  finalista1: usuario = {nickname:"Ernesto", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""}
  finalista2: usuario = {nickname:"Mariano", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""}
  ganador: usuario = {nickname:"Ernesto", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""}
  

  constructor(private tournamentsService:TournamentsService,
    protected socket:SocketTournaments) { }

  ngOnInit(): void {

    if (TournamentsComponent.propietario){
      //creo el torneo en la bd
      var exito: boolean = false;
      if (this.getPrivate){
        this.codigo = this.makeid();
        this.tournamentsService.crearTorneoPrivado(UserServiceService.user.nickname, this.codigo).subscribe(datos=>{exito = datos.exito;});
      }else{
        this.tournamentsService.crearTorneoPublico(UserServiceService.user.nickname).subscribe(datos=>{exito = datos.exito;});
      }
      if (exito){
        this.socket.unirseTorneo(UserServiceService.user.nickname);
        //continuar
      }

    }
    
  }



  haz(){
    this.socket.esperarJugadores().subscribe((data:any)=>{

    })
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
    //borramos el torneo para que no se pueda unir nadie mas
    this.tournamentsService.borrarTorneo(UserServiceService.user.nickname).subscribe(datos=>{});

  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  
  ngOnDelete(){
    //Borramos el torneo si eramos el dueño
    if (TournamentsComponent.propietario){
      this.tournamentsService.borrarTorneo(UserServiceService.user.nickname).subscribe(datos=>{});
    }

  }

}
