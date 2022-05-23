import { Component, OnInit } from '@angular/core';
import { JuegoComponent } from '../juego/juego.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  constructor() { }

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
    JuegoComponent.modoJuego = t.toString()
  }

  ponerTiempoOnline(t:number){
    JuegoComponent.minutos = t;
    JuegoComponent.segundos = 0;
    JuegoComponent.online = true;
    JuegoComponent.ia = false;
    JuegoComponent.modoJuego = t.toString()
  }



}
