import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TournamentsService } from 'src/app/services/tournaments-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { JuegoComponent } from '../juego/juego.component';
import { TournamentsComponent } from '../tournaments/tournaments.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  codigoForm: FormGroup

  constructor(private _builderCodigo: FormBuilder,
    protected serviceTournaments:TournamentsService,
    protected router:Router) { 
    this.codigoForm = this._builderCodigo.group({
      codigo: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  ponerTiempo(t:number){
    JuegoComponent.minutos = t;
    JuegoComponent.segundos = 0;
    JuegoComponent.ia = false;
    JuegoComponent.online = false;
    JuegoComponent.modoJuego = t.toString()
  }

  ponerTiempoIA(t:number){
    JuegoComponent.minutos = t;
    JuegoComponent.segundos = 0;
    JuegoComponent.ia = true;
    JuegoComponent.online = false;
    if (t == 0){
      JuegoComponent.modoJuego = "NT"
    }else{
      JuegoComponent.modoJuego = t.toString()
    }
  }

  ponerTiempoOnline(t:number){
    JuegoComponent.minutos = t;
    JuegoComponent.segundos = 0;
    JuegoComponent.online = true;
    JuegoComponent.ia = false;
    if (t == 0){
      JuegoComponent.modoJuego = "NT"
    }else{
      JuegoComponent.modoJuego = t.toString()
    }
    
  }

  buscarCodigo(g: FormGroup){
    this.serviceTournaments.comprobarCodigoTorneo(g.get('codigo')!.value).subscribe(data =>{
      if (data.exito){
        this.serviceTournaments.entrarTorneo(data.creador).subscribe(datos=>{
          TournamentsComponent.propietario = false;
          TournamentsComponent.owner = data.creador;
          TournamentsComponent.primeraVez = true;
          TournamentsComponent.players = 0;
          this.router.navigate(['/tournaments'])
        });
      }
    });
    console.log(g.get('codigo')!.value);
    this.codigoForm.reset()
  }

  torneoPublico(){
    TournamentsComponent.privado = false;
    TournamentsComponent.propietario = true;
    TournamentsComponent.owner = UserServiceService.user.nickname;
    TournamentsComponent.primeraVez = true;
    TournamentsComponent.players = 0;
  }

  torneoPrivado(){
    TournamentsComponent.privado = true;
    TournamentsComponent.propietario = true;
    TournamentsComponent.owner = UserServiceService.user.nickname;
    TournamentsComponent.primeraVez = true;
    TournamentsComponent.players = 0;
  }




}
