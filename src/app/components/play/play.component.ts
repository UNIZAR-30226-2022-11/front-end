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
    JuegoComponent.ia = false;
  }

  ponerTiempoIA(t:number){
    JuegoComponent.minutos = t;
    JuegoComponent.ia = true;
  }



}
