import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from 'src/app/other/interfaces';
import { SocketTournaments } from 'src/app/services/socket.service';
import { TournamentsService } from 'src/app/services/tournaments-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { JuegoComponent } from '../juego/juego.component';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  
  static ronda: string = "semifinal";
  players:number = 1; 
  static privado: boolean;
  codigo:string ="GALKGSD";
  static propietario: boolean = false;
  static owner: string = '';

  jugador1: usuario = UserServiceService.user;
  jugador2: usuario = {nickname:"Ines", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""}
  jugador3: usuario = {nickname:"Maria", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""}
  jugador4: usuario = {nickname:"Mariano", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""}
  finalista1: usuario = {nickname:"Ernesto", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""}
  finalista2: usuario = {nickname:"Mariano", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""}
  ganador: usuario = {nickname:"Ernesto", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""}
  
  jugadores: Array<usuario> = [
    UserServiceService.user,
    UserServiceService.user,
    UserServiceService.user,
    UserServiceService.user,
    UserServiceService.user,
    UserServiceService.user,
    UserServiceService.user
  ]

  get getOwner(){
    return TournamentsComponent.owner;
  }

  constructor(private tournamentsService:TournamentsService,
    protected socket:SocketTournaments,protected router: Router) { }

  ngOnInit(): void {
    console.log(TournamentsComponent.owner)
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
        this.socket.unirseTorneo(TournamentsComponent.owner,UserServiceService.user.nickname);
        //continuar
      }

    }
    
    this.socket.esperarJugadores().subscribe((data:any)=>{
      for (let i = 0; data.length; i++){
        this.jugadores[i].nickname = data[i]
      }
      /*
      this.jugador1 = data[0];
      this.jugador2 = data[1];
      this.jugador3 = data[2];
      this.jugador4 = data[3];
      this.finalista1 = data[4];
      this.finalista2 = data[5];
      this.ganador = data[6];*/
    })

    this.socket.recibirOrden().subscribe((data:any) => {
      var k = -1;
      for (let i = this.jugadores.length -1; i >= 0; i--){
        if (this.jugadores[i].nickname == UserServiceService.user.nickname){
          k = i;
          break;
        }
      }
      switch (k){
        case 0:
          if (TournamentsComponent.ronda == "semifinal"){
            JuegoComponent.minutos = 3;
            JuegoComponent.segundos = 0;
            JuegoComponent.ia = false;
            JuegoComponent.online = true;
            JuegoComponent.modoJuego = "A"
            JuegoComponent.amigo = this.jugadores[1].nickname;
            //JuegoComponent.torneo = true;
            this.router.navigate(['/juego']);
          }
          break;
        case 1:
          if (TournamentsComponent.ronda == "semifinal"){
            JuegoComponent.minutos = 3;
            JuegoComponent.segundos = 0;
            JuegoComponent.ia = false;
            JuegoComponent.online = true;
            JuegoComponent.modoJuego = "A"
            JuegoComponent.amigo = this.jugadores[0].nickname;
            //JuegoComponent.torneo = true;
            this.router.navigate(['/juego']);
          }
          break;
        case 2:
          if (TournamentsComponent.ronda == "semifinal"){
            JuegoComponent.minutos = 3;
            JuegoComponent.segundos = 0;
            JuegoComponent.ia = false;
            JuegoComponent.online = true;
            JuegoComponent.modoJuego = "A"
            JuegoComponent.amigo = this.jugadores[3].nickname;
            //JuegoComponent.torneo = true;
            this.router.navigate(['/juego']);
          }
          break;
        case 3:
          if (TournamentsComponent.ronda == "semifinal"){
            JuegoComponent.minutos = 3;
            JuegoComponent.segundos = 0;
            JuegoComponent.ia = false;
            JuegoComponent.online = true;
            JuegoComponent.modoJuego = "A"
            JuegoComponent.amigo = this.jugadores[2].nickname;
            //JuegoComponent.torneo = true;
            this.router.navigate(['/juego']);
          }
          break;
        case 4:
          if (TournamentsComponent.ronda == "final"){
            JuegoComponent.minutos = 3;
            JuegoComponent.segundos = 0;
            JuegoComponent.ia = false;
            JuegoComponent.online = true;
            JuegoComponent.modoJuego = "A"
            JuegoComponent.amigo = this.jugadores[5].nickname;
            //JuegoComponent.torneo = true;
            this.router.navigate(['/juego']);
          }
          break;
        case 5:
          if (TournamentsComponent.ronda == "final"){
            JuegoComponent.minutos = 3;
            JuegoComponent.segundos = 0;
            JuegoComponent.ia = false;
            JuegoComponent.online = true;
            JuegoComponent.modoJuego = "A"
            JuegoComponent.amigo = this.jugadores[4].nickname;
            //JuegoComponent.torneo = true;
            this.router.navigate(['/juego']);
          }
          break;

      }
    })
    

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
    if (this.players == 3){
      this.socket.unirseTorneo(TournamentsComponent.owner,'');
    }
    this.socket.empezar(UserServiceService.user.nickname);


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
