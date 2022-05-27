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
  
  static ronda: number  = 0;
  players:number = 0; 
  static privado: boolean;
  codigo:string ="";
  static propietario: boolean = false;
  static owner: string = '';
  static primeraVez = false;
  get getPropietario(){
    return TournamentsComponent.propietario;
  }

  
  jugadores: Array<usuario> = [
    {nickname:"", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""},
    {nickname:"", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""},
    {nickname:"", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""},
    {nickname:"", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""},
    {nickname:"", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""},
    {nickname:"", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""},
    {nickname:"", avatar:"",monedas:0,piezas:"",puntos:0,tablero:""},
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
      //this.tournamentsService.borrarTorneo(UserServiceService.user.nickname).subscribe(datos=>{});;
      console.log("borrar torneo");
      if (this.getPrivate){
        this.codigo = this.makeid();
        this.tournamentsService.crearTorneoPrivado(UserServiceService.user.nickname, this.codigo).subscribe(datos=>{exito = datos.exito;});
      }else{
        this.tournamentsService.crearTorneoPublico(UserServiceService.user.nickname).subscribe(datos=>{exito = datos.exito;});
      }
      if (exito){
        
        //continuar
      }

    }
    if (TournamentsComponent.primeraVez){
    console.log("unir a "+ UserServiceService.user.nickname)
    this.socket.unirseTorneo(TournamentsComponent.owner,UserServiceService.user.nickname);
    TournamentsComponent.primeraVez = false;
    }
    
    console.log("esperar jugadores")
    this.socket.esperarJugadores().subscribe((data:any)=>{
        this.jugadores[0].nickname = data.j0;
        this.jugadores[1].nickname = data.j1;
        this.jugadores[2].nickname = data.j2;
        this.jugadores[3].nickname = data.j3;
        this.jugadores[4].nickname = data.j4;
        this.jugadores[5].nickname = data.j5;
        this.jugadores[6].nickname = data.j6;

      this.players = this.players + 1;
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

      if (this.jugadores[6].nickname != ''){
        if (this.jugadores[6].nickname == UserServiceService.user.nickname){
          if (this.jugadores[5].nickname != UserServiceService.user.nickname){
            this.tournamentsService.resultadosTorneo(UserServiceService.user.nickname, this.jugadores[5].nickname)  
          }else{
            this.tournamentsService.resultadosTorneo(UserServiceService.user.nickname, this.jugadores[4].nickname)  
          }
        }
        this.router.navigate(['/play']); 
      }else if (this.jugadores[5].nickname != '' && this.jugadores[4].nickname != ''){
        if (this.jugadores[5].nickname == UserServiceService.user.nickname){
          JuegoComponent.minutos = 3;
          JuegoComponent.segundos = 0;
          JuegoComponent.ia = false;
          JuegoComponent.online = true;
          JuegoComponent.modoJuego = "A"
          JuegoComponent.amigo = this.jugadores[4].nickname;
          JuegoComponent.torneo = true;
          this.router.navigate(['/juego']);
        }else if (this.jugadores[4].nickname == UserServiceService.user.nickname){
          JuegoComponent.minutos = 3;
          JuegoComponent.segundos = 0;
          JuegoComponent.ia = false;
          JuegoComponent.online = true;
          JuegoComponent.modoJuego = "A"
          JuegoComponent.amigo = this.jugadores[5].nickname;
          JuegoComponent.torneo = true;
          this.router.navigate(['/juego']);
        }
      }else {
        if (this.jugadores[0].nickname == UserServiceService.user.nickname){
          JuegoComponent.minutos = 3;
          JuegoComponent.segundos = 0;
          JuegoComponent.ia = false;
          JuegoComponent.online = true;
          JuegoComponent.modoJuego = "A"
          JuegoComponent.amigo = this.jugadores[1].nickname;
          JuegoComponent.torneo = true;
          this.router.navigate(['/juego']);
        }else if (this.jugadores[1].nickname == UserServiceService.user.nickname){
          JuegoComponent.minutos = 3;
          JuegoComponent.segundos = 0;
          JuegoComponent.ia = false;
          JuegoComponent.online = true;
          JuegoComponent.modoJuego = "A"
          JuegoComponent.amigo = this.jugadores[0].nickname;
          JuegoComponent.torneo = true;
          this.router.navigate(['/juego']);
        }else if (this.jugadores[2].nickname == UserServiceService.user.nickname){
          if (this.jugadores[3].nickname == ''){
            console.log("unir a "+ UserServiceService.user.nickname)
            //this.socket.unirseTorneo(TournamentsComponent.owner,UserServiceService.user.nickname);          
          }else{
            JuegoComponent.minutos = 3;
              JuegoComponent.segundos = 0;
              JuegoComponent.ia = false;
              JuegoComponent.online = true;
              JuegoComponent.modoJuego = "A"
              JuegoComponent.amigo = this.jugadores[3].nickname;
              JuegoComponent.torneo = true;
              this.router.navigate(['/juego']);
          }
        }else if (this.jugadores[3].nickname == UserServiceService.user.nickname){
            JuegoComponent.minutos = 3;
            JuegoComponent.segundos = 0;
            JuegoComponent.ia = false;
            JuegoComponent.online = true;
            JuegoComponent.modoJuego = "A"
            JuegoComponent.amigo = this.jugadores[2].nickname;
            JuegoComponent.torneo = true;
            this.router.navigate(['/juego']);
        }
      }

/*
      switch (k){
        case 0:
          if (TournamentsComponent.ronda == 0){
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
          if (TournamentsComponent.ronda == 0){
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
          if (TournamentsComponent.ronda == 0){
            if (this.jugadores[3].nickname == ''){
              this.socket.unirseTorneo(TournamentsComponent.owner,UserServiceService.user.nickname);
              TournamentsComponent.ronda = 1;
            }else{
              JuegoComponent.minutos = 3;
              JuegoComponent.segundos = 0;
              JuegoComponent.ia = false;
              JuegoComponent.online = true;
              JuegoComponent.modoJuego = "A"
              JuegoComponent.amigo = this.jugadores[3].nickname;
              //JuegoComponent.torneo = true;
              this.router.navigate(['/juego']);
            }
          }
          break;
        case 3:
          if (TournamentsComponent.ronda == 0){
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
          if (TournamentsComponent.ronda == 1){
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
          if (TournamentsComponent.ronda == 1){
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

      }*/
    })
    

  }



  haz(){
    this.socket.esperarJugadores().subscribe((data:any)=>{

    })
  }

  get getPrivate(){
    return TournamentsComponent.privado
  }

  eliminarTorneo(){
    this.tournamentsService.borrarTorneo(UserServiceService.user.nickname).subscribe(datos=>{});
    this.socket.eliminarTorneo(UserServiceService.user.nickname)
  }

  ngOnDestroy(){
    //cerrar torneo
    if (TournamentsComponent.propietario){
      this.tournamentsService.borrarTorneo(UserServiceService.user.nickname).subscribe(datos=>{});
      
    }
    console.log("cerrarTorneo")
  }

  startTournament(){
    console.log(this.players);
    //borramos el torneo para que no se pueda unir nadie mas
    this.tournamentsService.borrarTorneo(UserServiceService.user.nickname).subscribe(datos=>{});
    if (this.players == 3){
      console.log("unir a "+'')
      this.socket.unirseTorneo(TournamentsComponent.owner,'');
      this.socket.unirseTorneo(TournamentsComponent.owner,this.jugadores[2].nickname )
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
