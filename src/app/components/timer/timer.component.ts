import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { interval, timer } from 'rxjs';
import { JuegoComponent } from '../juego/juego.component';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {

  public minutes:number = JuegoComponent.minutos;
  public seconds:number = JuegoComponent.segundos;
  static timer:any;
  private date = new Date();

  public minutes2:number = JuegoComponent.minutos;
  public seconds2:number = JuegoComponent.segundos;
  private timer2:any;
  private date2 = new Date();

  //posicion en funcion de piezas; timer => blancas || timer2=> negras
  public blancas:number = 90;
  public negras:number = 10;

  resetTimer(){
    this.minutes = JuegoComponent.minutos;
    this.seconds = JuegoComponent.segundos;

    this.minutes2 = JuegoComponent.minutos;
    this.seconds2 = JuegoComponent.segundos;
  }



finTiempo1:boolean = false;
  updateTimer(){
    this.date.setMinutes(this.minutes);
    this.date.setSeconds(this.seconds);
    const time = this.date.getTime();
    this.date.setTime(time - 1000);

    this.minutes = this.date.getMinutes();
    this.seconds = this.date.getSeconds();

    if(this.date.getMinutes() === 0 && this.date.getSeconds() ===0 ){
      //stop the count
      JuegoComponent.finTiempo1 = true;
      clearInterval(TimerComponent.timer);
    }
  }

  finTiempo2:boolean = false;
  updateTimer2(){
    this.date2.setMinutes(this.minutes2);
    this.date2.setSeconds(this.seconds2);
    const time = this.date2.getTime();
    this.date2.setTime(time - 1000);

    this.minutes2 = this.date2.getMinutes();
    this.seconds2 = this.date2.getSeconds();

    if(this.date2.getMinutes() === 0 && this.date2.getSeconds() ===0 ){
      //stop the count
      JuegoComponent.finTiempo2 = true;
      clearInterval(this.timer2);
    }
  }

  stop(){
    clearInterval(TimerComponent.timer);
  }

  stop2(){
    clearInterval(this.timer2);
  }

   start(){
    if(this.minutes > 0 || this.seconds > 0) {
      this.updateTimer();

      if(this.seconds > 0) {
        TimerComponent.timer = setInterval(() => {
          this.updateTimer();
        },1000)
      }
    }
  }

  start2(){
    if(this.minutes2 > 0 || this.seconds2 > 0) {
      this.updateTimer2();

      if(this.seconds2 > 0) {
        this.timer2 = setInterval(() => {
          this.updateTimer2();
        },1000)
      }
    }
  }
}
