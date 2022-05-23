import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JuegoComponent } from '../juego/juego.component';
import { TournamentsComponent } from '../tournaments/tournaments.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  codigoForm: FormGroup

  constructor(private _builderCodigo: FormBuilder) { 
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
  }

  ponerTiempoIA(t:number){
    JuegoComponent.minutos = t;
    JuegoComponent.segundos = 0;
    JuegoComponent.ia = true;
    JuegoComponent.online = false;
  }

  ponerTiempoOnline(t:number){
    JuegoComponent.minutos = t;
    JuegoComponent.segundos = 0;
    JuegoComponent.online = true;
    JuegoComponent.ia = false;
  }

  buscarCodigo(g: FormGroup){
    console.log(g.get('codigo')!.value);
    this.codigoForm.reset()
  }

  torneoPublico(){
    TournamentsComponent.crearTorneo(false)
  }

  torneoPrivado(){
    TournamentsComponent.crearTorneo(true)
  }




}
