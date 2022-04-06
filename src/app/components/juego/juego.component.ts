import { Component, OnInit } from '@angular/core';
import { pieza } from 'src/app/other/interfaces';
import { ViewChild } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent{

  //apartado de timer ///////////////////////////////////////////////////////////////////
  
  //variables estaticas del timer
  static segundos = 10;
  static minutos = 0;
  //variable estática de victoria
  static ganar = false;

  @ViewChild(TimerComponent)
  timer!: TimerComponent;

  start(){this.timer.start();}
  start2(){this.timer.start2();}

  //cierra apartado de timer //////////////////////////////////////////////////////////////
  

  //posiciones de las piezas segun su casilla
  columna:number[] =[25.6, 31.87, 38.14, 44.41, 50.68, 56.95, 63.22, 69.5]
  fila:number[] = [2.1, 14.43, 26.86, 39.29, 51.72, 64.15, 76.58, 89.31]
  

  //variable que informa si hemos seleccionado una ficha
  seleccionada = false;

  //fila/columna de las que parte la ficha seleccionada
  filaIni:number = 0;
  columnIni:number = 0;

  //fila/columna de a las que mueve la ficha seleccionada
  filaFin:number = 0;
  columnFin:number = 0;  

  auxX:number = 0;
  auxY:number = 0;

  puedeMover:boolean = true;

  ver:boolean = false
  
  blanco:number = 1
  negro:number = 0
  turno:boolean = true //0 para blancas, 1 para negras


  //valor para casillas vacias
  v:pieza = {"col":"", "fil":"", "img": "", "color":0};
  
  //piezas del tablero 

  //negras

  peonNegro0:pieza = {"col":this.columna[(this.blanco*7)+(0*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": "./assets/ajedrez/peon_negro.png", "color":-1};
  peonNegro1:pieza = {"col":this.columna[(this.blanco*6)+1*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": "./assets/ajedrez/peon_negro.png", "color":-1};
  peonNegro2:pieza = {"col":this.columna[(this.blanco*5)+2*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": "./assets/ajedrez/peon_negro.png", "color":-1};
  peonNegro3:pieza = {"col":this.columna[(this.blanco*4)+3*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": "./assets/ajedrez/peon_negro.png", "color":-1};
  peonNegro4:pieza = {"col":this.columna[(this.blanco*3)+4*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": "./assets/ajedrez/peon_negro.png", "color":-1};
  peonNegro5:pieza = {"col":this.columna[(this.blanco*2)+5*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": "./assets/ajedrez/peon_negro.png", "color":-1};
  peonNegro6:pieza = {"col":this.columna[(this.blanco*1)+6*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": "./assets/ajedrez/peon_negro.png", "color":-1};
  peonNegro7:pieza = {"col":this.columna[(this.blanco*0)+7*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": "./assets/ajedrez/peon_negro.png", "color":-1};
  
  alfilNegro0:pieza = {"col":this.columna[(this.blanco*5)+(2*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": "./assets/ajedrez/alfil_negro.png", "color":-1};
  alfilNegro1:pieza = {"col":this.columna[(this.blanco*2)+(5*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": "./assets/ajedrez/alfil_negro.png", "color":-1};
 
  caballoNegro0:pieza = {"col":this.columna[(this.blanco*6)+(1*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": "./assets/ajedrez/caballo_negro.png", "color":-1};
  caballoNegro1:pieza = {"col":this.columna[(this.blanco*1)+(6*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": "./assets/ajedrez/caballo_negro.png", "color":-1};
  
  torreNegra0:pieza = {"col":this.columna[(this.blanco*7)+(0*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": "./assets/ajedrez/torre_negra.png", "color":-1};
  torreNegra1:pieza = {"col":this.columna[(this.blanco*0)+(7*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": "./assets/ajedrez/torre_negra.png", "color":-1};
  
  reinaNegra:pieza = {"col":this.columna[(this.blanco*3)+(3*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": "./assets/ajedrez/reina_negra.png", "color":-1};
  reyNegro:pieza = {"col":this.columna[(this.blanco*4)+(4*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": "./assets/ajedrez/rey_negro.png", "color":-1};

  //blancas
  peonBlanco0:pieza = {"col":this.columna[(this.blanco*0)+(7*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": "./assets/ajedrez/peon_blanco.png", "color":1};
  peonBlanco1:pieza = {"col":this.columna[(this.blanco*1)+(6*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": "./assets/ajedrez/peon_blanco.png", "color":1};
  peonBlanco2:pieza = {"col":this.columna[(this.blanco*2)+(5*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": "./assets/ajedrez/peon_blanco.png", "color":1};
  peonBlanco3:pieza = {"col":this.columna[(this.blanco*3)+(4*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": "./assets/ajedrez/peon_blanco.png", "color":1};
  peonBlanco4:pieza = {"col":this.columna[(this.blanco*4)+(3*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": "./assets/ajedrez/peon_blanco.png", "color":1};
  peonBlanco5:pieza = {"col":this.columna[(this.blanco*5)+(2*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": "./assets/ajedrez/peon_blanco.png", "color":1};
  peonBlanco6:pieza = {"col":this.columna[(this.blanco*6)+(1*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": "./assets/ajedrez/peon_blanco.png", "color":1};
  peonBlanco7:pieza = {"col":this.columna[(this.blanco*7)+(0*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": "./assets/ajedrez/peon_blanco.png", "color":1};
 
  alfilBlanco0:pieza = {"col":this.columna[(this.blanco*2)+(5*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": "./assets/ajedrez/alfil_blanco.png", "color":1};
  alfilBlanco1:pieza = {"col":this.columna[(this.blanco*5)+(2*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": "./assets/ajedrez/alfil_blanco.png", "color":1};
 
  caballoBlanco0:pieza = {"col":this.columna[(this.blanco*1)+(6*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": "./assets/ajedrez/caballo_blanco.png", "color":1};
  caballoBlanco1:pieza = {"col":this.columna[(this.blanco*6)+(1*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": "./assets/ajedrez/caballo_blanco.png", "color":1};
 
  torreBlanca0:pieza = {"col":this.columna[(this.blanco*0)+(7*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": "./assets/ajedrez/torre_blanca.png", "color":1};
  torreBlanca1:pieza = {"col":this.columna[(this.blanco*7)+(0*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": "./assets/ajedrez/torre_blanca.png", "color":1};
  
  reinaBlanca:pieza = {"col":this.columna[(this.blanco*3)+(4*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": "./assets/ajedrez/reina_blanca.png", "color":1};
  reinaBlanca0:pieza = {"col":"", "fil":"", "img": "", "color":0};
  
  reyBlanco:pieza = {"col":this.columna[(this.blanco*4)+(3*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": "./assets/ajedrez/rey_blanco.png", "color":1};
  

  //tableros
  tableroNegro:pieza[][] = 
  [
    [this.torreBlanca1, this.caballoBlanco1, this.alfilBlanco1, this.reyBlanco, this.reinaBlanca, this.alfilBlanco0, this.caballoBlanco0, this.torreBlanca0],
    [this.peonBlanco7, this.peonBlanco6, this.peonBlanco5, this.peonBlanco4, this.peonBlanco3, this.peonBlanco2, this.peonBlanco1, this.peonBlanco0],
    [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
    [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
    [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
    [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
    [this.peonNegro0, this.peonNegro1, this.peonNegro2, this.peonNegro3, this.peonNegro4, this.peonNegro5, this.peonNegro6, this.peonNegro7],
    [this.torreNegra0, this.caballoNegro0, this.alfilNegro0, this.reyNegro, this.reinaNegra, this.alfilNegro1, this.caballoNegro1, this.torreNegra1]
]

tableroBlanco:pieza[][] = 
[
  [this.torreNegra1, this.caballoNegro1, this.alfilNegro1, this.reinaNegra, this.reyNegro, this.alfilNegro0, this.caballoNegro0, this.torreNegra0],
  [this.peonNegro7, this.peonNegro6, this.peonNegro5, this.peonNegro4, this.peonNegro3, this.peonNegro2, this.peonNegro1, this.peonNegro0],
  [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
  [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
  [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
  [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
  [this.peonBlanco0, this.peonBlanco1, this.peonBlanco2, this.peonBlanco3, this.peonBlanco4, this.peonBlanco5, this.peonBlanco6, this.peonBlanco7],
  [this.torreBlanca0, this.caballoBlanco0, this.alfilBlanco0, this.reinaBlanca, this.reyBlanco, this.alfilBlanco1, this.caballoBlanco1, this.torreBlanca1]

]

  tablero:pieza[][] = this.tableroBlanco;


  pieza:string = ""

  w = window.innerWidth;
  h = window.innerHeight;

  clickY = 0;
  clickX = 0;


  enroqueNegro0:boolean = true;
  enroqueNegro1:boolean = true;
  enroqueBlanco0:boolean = true;
  enroqueBlanco1:boolean = true;

  reset() {
    this.enroqueNegro0 = true;
    this.enroqueNegro1 = true;
    this.enroqueBlanco0 = true;
    this.enroqueBlanco1 = true;
    this.seleccionada = false
    this.turno = true
  }

  elegirLado(blanco:boolean){
    if(blanco) {
      console.log("buenas")
      this.tablero = this.tableroBlanco;
      this.blanco = 1
      this.negro = 0
    }
    else {
      console.log("malas")
      //this.tablero = this.tableroNegro;
      this.blanco = 0
      this.negro = 1
    }

      //piezas del tablero 

    //negras

    this.peonNegro0 = {"col":this.columna[(this.blanco*7)+(0*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": "./assets/ajedrez/peon_negro.png", "color":-1};
    this.peonNegro1 = {"col":this.columna[(this.blanco*6)+1*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": "./assets/ajedrez/peon_negro.png", "color":-1};
    this.peonNegro2 = {"col":this.columna[(this.blanco*5)+2*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": "./assets/ajedrez/peon_negro.png", "color":-1};
    this.peonNegro3 = {"col":this.columna[(this.blanco*4)+3*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": "./assets/ajedrez/peon_negro.png", "color":-1};
    this.peonNegro4 = {"col":this.columna[(this.blanco*3)+4*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": "./assets/ajedrez/peon_negro.png", "color":-1};
    this.peonNegro5 = {"col":this.columna[(this.blanco*2)+5*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": "./assets/ajedrez/peon_negro.png", "color":-1};
    this.peonNegro6 = {"col":this.columna[(this.blanco*1)+6*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": "./assets/ajedrez/peon_negro.png", "color":-1};
    this.peonNegro7 = {"col":this.columna[(this.blanco*0)+7*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": "./assets/ajedrez/peon_negro.png", "color":-1};
    
    this.alfilNegro0 = {"col":this.columna[(this.blanco*5)+(2*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": "./assets/ajedrez/alfil_negro.png", "color":-1};
    this.alfilNegro1 = {"col":this.columna[(this.blanco*2)+(5*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": "./assets/ajedrez/alfil_negro.png", "color":-1};
  
    this.caballoNegro0 = {"col":this.columna[(this.blanco*6)+(1*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": "./assets/ajedrez/caballo_negro.png", "color":-1};
    this.caballoNegro1 = {"col":this.columna[(this.blanco*1)+(6*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": "./assets/ajedrez/caballo_negro.png", "color":-1};
    
    this.torreNegra0 = {"col":this.columna[(this.blanco*7)+(0*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": "./assets/ajedrez/torre_negra.png", "color":-1};
    this.torreNegra1 = {"col":this.columna[(this.blanco*0)+(7*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": "./assets/ajedrez/torre_negra.png", "color":-1};
    
    this.reinaNegra = {"col":this.columna[(this.blanco*3)+(4*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": "./assets/ajedrez/reina_negra.png", "color":-1};
    this.reyNegro = {"col":this.columna[(this.blanco*4)+(3*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": "./assets/ajedrez/rey_negro.png", "color":-1};

    //blancas
    this.peonBlanco0 = {"col":this.columna[(this.blanco*0)+(7*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": "./assets/ajedrez/peon_blanco.png", "color":1};
    this.peonBlanco1 = {"col":this.columna[(this.blanco*1)+(6*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": "./assets/ajedrez/peon_blanco.png", "color":1};
    this.peonBlanco2 = {"col":this.columna[(this.blanco*2)+(5*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": "./assets/ajedrez/peon_blanco.png", "color":1};
    this.peonBlanco3 = {"col":this.columna[(this.blanco*3)+(4*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": "./assets/ajedrez/peon_blanco.png", "color":1};
    this.peonBlanco4 = {"col":this.columna[(this.blanco*4)+(3*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": "./assets/ajedrez/peon_blanco.png", "color":1};
    this.peonBlanco5 = {"col":this.columna[(this.blanco*5)+(2*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": "./assets/ajedrez/peon_blanco.png", "color":1};
    this.peonBlanco6 = {"col":this.columna[(this.blanco*6)+(1*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": "./assets/ajedrez/peon_blanco.png", "color":1};
    this.peonBlanco7 = {"col":this.columna[(this.blanco*7)+(0*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": "./assets/ajedrez/peon_blanco.png", "color":1};
  
    this.alfilBlanco0 = {"col":this.columna[(this.blanco*2)+(5*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": "./assets/ajedrez/alfil_blanco.png", "color":1};
    this.alfilBlanco1 = {"col":this.columna[(this.blanco*5)+(2*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": "./assets/ajedrez/alfil_blanco.png", "color":1};
  
    this.caballoBlanco0 = {"col":this.columna[(this.blanco*1)+(6*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": "./assets/ajedrez/caballo_blanco.png", "color":1};
    this.caballoBlanco1 = {"col":this.columna[(this.blanco*6)+(1*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": "./assets/ajedrez/caballo_blanco.png", "color":1};
  
    this.torreBlanca0 = {"col":this.columna[(this.blanco*0)+(7*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": "./assets/ajedrez/torre_blanca.png", "color":1};
    this.torreBlanca1 = {"col":this.columna[(this.blanco*7)+(0*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": "./assets/ajedrez/torre_blanca.png", "color":1};
    
    this.reinaBlanca = {"col":this.columna[(this.blanco*3)+(4*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": "./assets/ajedrez/reina_blanca.png", "color":1};
    this.reyBlanco = {"col":this.columna[(this.blanco*4)+(3*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": "./assets/ajedrez/rey_blanco.png", "color":1};
    if(blanco) {
      this.tablero = [
        [this.torreNegra1, this.caballoNegro1, this.alfilNegro1, this.reinaNegra, this.reyNegro, this.alfilNegro0, this.caballoNegro0, this.torreNegra0],
        [this.peonNegro7, this.peonNegro6, this.peonNegro5, this.peonNegro4, this.peonNegro3, this.peonNegro2, this.peonNegro1, this.peonNegro0],
        [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
        [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
        [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
        [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
        [this.peonBlanco0, this.peonBlanco1, this.peonBlanco2, this.peonBlanco3, this.peonBlanco4, this.peonBlanco5, this.peonBlanco6, this.peonBlanco7],
        [this.torreBlanca0, this.caballoBlanco0, this.alfilBlanco0, this.reinaBlanca, this.reyBlanco, this.alfilBlanco1, this.caballoBlanco1, this.torreBlanca1]
      
      ]
    } else {
      this.tablero =   [
        [this.torreBlanca1, this.caballoBlanco1, this.alfilBlanco1, this.reyBlanco, this.reinaBlanca, this.alfilBlanco0, this.caballoBlanco0, this.torreBlanca0],
        [this.peonBlanco7, this.peonBlanco6, this.peonBlanco5, this.peonBlanco4, this.peonBlanco3, this.peonBlanco2, this.peonBlanco1, this.peonBlanco0],
        [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
        [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
        [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
        [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
        [this.peonNegro0, this.peonNegro1, this.peonNegro2, this.peonNegro3, this.peonNegro4, this.peonNegro5, this.peonNegro6, this.peonNegro7],
        [this.torreNegra0, this.caballoNegro0, this.alfilNegro0, this.reyNegro, this.reinaNegra, this.alfilNegro1, this.caballoNegro1, this.torreNegra1]
    ]
    }
  this.reset()
  }

  peon():boolean {
    if((this.pieza == "peonNegro0") || (this.pieza == "peonNegro1") || (this.pieza == "peonNegro2")
      || (this.pieza == "peonNegro3") || (this.pieza == "peonNegro4") || (this.pieza == "peonNegro5")
      || (this.pieza == "peonNegro6") || (this.pieza == "peonNegro7")
      || (this.pieza == "peonBlanco0") || (this.pieza == "peonBlanco1") || (this.pieza == "peonBlanco2") 
      || (this.pieza == "peonBlanco3") || (this.pieza == "peonBlanco4") || (this.pieza == "peonBlanco5")
      || (this.pieza == "peonBlanco6") || (this.pieza == "peonBlanco7")){
        return true;
      }
      else {return false}
  }

  alfil():boolean {
    if((this.pieza == "alfilNegro0") || ((this.pieza == "alfilNegro1")) || ((this.pieza == "alfilBlanco0")) || ((this.pieza == "alfilBlanco1"))){
      return true
    }
    else {return false}
  }

  caballo():boolean {
    if((this.pieza == "caballoNegro0") || ((this.pieza == "caballoNegro1")) || ((this.pieza == "caballoBlanco0")) || ((this.pieza == "caballoBlanco1"))){
      return true
    }
    else {return false}
  }

  torre():boolean {

    if((this.pieza == "torreNegra0") || ((this.pieza == "torreNegra1")) || ((this.pieza == "torreBlanca0")) || ((this.pieza == "torreBlanca1"))){
      return true
    } else{
      return false
    }

  }

  rey():boolean {
    if((this.pieza == "reyNegro") || (this.pieza == "reyBlanco")){
      return true
    } else{
      return false
    }
  }

  getPosition(event:MouseEvent){

    this.clickX = event.clientX/this.w;
    this.clickY = event.clientY/this.h;

    //en que punto relativo a la pantalla he clickado

    this.clickX = (this.clickX*100) - 25
    this.clickY = (this.clickY*100) 

    //punto relativo al tablero

    this.clickX = this.clickX/6.25
    this.clickY = this.clickY/12.5

    this.columnIni = Math.trunc(this.clickX)
    this.filaIni = Math.trunc(this.clickY)
  }

  seleccion(p:string, event:MouseEvent) {
    this.seleccionada = !this.seleccionada;
    this.pieza = p;
    this.getPosition(event);
  }

  seleccionar(p:string, event:MouseEvent) {
    
    if(!this.seleccionada) {
      //negras
      if(!this.turno) {
        if(p == "peonNegro0") {
          this.peonNegro0.img = "./assets/ajedrez/peon_azul.png"; this.seleccion(p, event)
        }
        else if(p == "peonNegro1") {
          this.peonNegro1.img = "./assets/ajedrez/peon_azul.png"; this.seleccion(p, event)
        }  
        else if(p == "peonNegro2") {
          this.peonNegro2.img = "./assets/ajedrez/peon_azul.png"; this.seleccion(p, event)
        }
        else if(p == "peonNegro3") {
          this.peonNegro3.img = "./assets/ajedrez/peon_azul.png"; this.seleccion(p, event)
        } 
        else if(p == "peonNegro4") {
          this.peonNegro4.img = "./assets/ajedrez/peon_azul.png"; this.seleccion(p, event)
        } 
        else if(p == "peonNegro5") {
          this.peonNegro5.img = "./assets/ajedrez/peon_azul.png"; this.seleccion(p, event)
        }
        else if(p == "peonNegro6") {
          this.peonNegro6.img = "./assets/ajedrez/peon_azul.png"; this.seleccion(p, event)
        }  
        else if(p == "peonNegro7") {
          this.peonNegro7.img = "./assets/ajedrez/peon_azul.png"; this.seleccion(p, event)
        }

        //alfil
        else if(p == "alfilNegro0") {
          this.alfilNegro0.img = "./assets/ajedrez/alfil_azul.png"; this.seleccion(p, event)
        }
        else if(p == "alfilNegro1") {
          this.alfilNegro1.img = "./assets/ajedrez/alfil_azul.png"; this.seleccion(p, event)
        }

        //caballo
        else if(p == "caballoNegro0") {
          this.caballoNegro0.img = "./assets/ajedrez/caballo_azul.png"; this.seleccion(p, event)
        }
        else if(p == "caballoNegro1") {
          this.caballoNegro1.img = "./assets/ajedrez/caballo_azul.png"; this.seleccion(p, event)
        }

        //torres
        else if(p == "torreNegra0") {
          this.torreNegra0.img = "./assets/ajedrez/torre_azul.png"; this.seleccion(p, event)
        }
        else if(p == "torreNegra1") {
          this.torreNegra1.img = "./assets/ajedrez/torre_azul.png"; this.seleccion(p, event)
        }

        //reina
        else if(p == "reinaNegra") {
          this.reinaNegra.img = "./assets/ajedrez/reina_azul.png"; this.seleccion(p, event)
        }
        //rey
        else if(p == "reyNegro") {
          this.reyNegro.img = "./assets/ajedrez/rey_azul.png"; this.seleccion(p, event)
        } 

      }
      //blancass
      else if(this.turno){
      
        //peones
        if(p == "peonBlanco0") {
          this.peonBlanco0.img = "./assets/ajedrez/peon_azul.png"; this.seleccion(p, event)
        }
        else if(p == "peonBlanco1") {
          this.peonBlanco1.img = "./assets/ajedrez/peon_azul.png"; this.seleccion(p, event)
        }  
        else if(p == "peonBlanco2") {
          this.peonBlanco2.img = "./assets/ajedrez/peon_azul.png"; this.seleccion(p, event)
        }
        else if(p == "peonBlanco3") {
          this.peonBlanco3.img = "./assets/ajedrez/peon_azul.png"; this.seleccion(p, event)
        } 
        else if(p == "peonBlanco4") {
          this.peonBlanco4.img = "./assets/ajedrez/peon_azul.png"; this.seleccion(p, event)
        } 
        else if(p == "peonBlanco5") {
          this.peonBlanco5.img = "./assets/ajedrez/peon_azul.png"; this.seleccion(p, event)
        }
        else if(p == "peonBlanco6") {
          this.peonBlanco6.img = "./assets/ajedrez/peon_azul.png"; this.seleccion(p, event)
        }  
        else if(p == "peonBlanco7") {
          this.peonBlanco7.img = "./assets/ajedrez/peon_azul.png"; this.seleccion(p, event)
        }


        //alfil
        else if(p == "alfilBlanco0") {
          this.alfilBlanco0.img = "./assets/ajedrez/alfil_azul.png"; this.seleccion(p, event)
        }
        else if(p == "alfilBlanco1") {
          this.alfilBlanco1.img = "./assets/ajedrez/alfil_azul.png"; this.seleccion(p, event)
        }

        //caballo
        else if(p == "caballoBlanco0") {
          this.caballoBlanco0.img = "./assets/ajedrez/caballo_azul.png"; this.seleccion(p, event)
        }
        else if(p == "caballoBlanco1") {
          this.caballoBlanco1.img = "./assets/ajedrez/caballo_azul.png"; this.seleccion(p, event)
        }
        //torres
        else if(p == "torreBlanca0") {
          this.torreBlanca0.img = "./assets/ajedrez/torre_azul.png"; this.seleccion(p, event)
        }
        else if(p == "torreBlanca1") {
          this.torreBlanca1.img = "./assets/ajedrez/torre_azul.png"; this.seleccion(p, event)
        }
        //reina
        else if(p == "reinaBlanca") {
          this.reinaBlanca.img = "./assets/ajedrez/reina_azul.png"; this.seleccion(p, event)
        }
        //rey
        else if(p == "reyBlanco") {
          this.reyBlanco.img = "./assets/ajedrez/rey_azul.png"; this.seleccion(p, event)
        } 
      }
      
    } 
    
    else if(p == this.pieza){
      if(p == "peonNegro0") {
        this.peonNegro0.img = "./assets/ajedrez/peon_negro.png"
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "peonNegro1") {
        this.peonNegro1.img = "./assets/ajedrez/peon_negro.png"
        this.seleccionada = !this.seleccionada;
      }  
      else if(p == "peonNegro2") {
        this.peonNegro2.img = "./assets/ajedrez/peon_negro.png"
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "peonNegro3") {
        this.peonNegro3.img = "./assets/ajedrez/peon_negro.png"
        this.seleccionada = !this.seleccionada;
      } 
      else if(p == "peonNegro4") {
        this.peonNegro4.img = "./assets/ajedrez/peon_negro.png"
        this.seleccionada = !this.seleccionada;
      } 
      else if(p == "peonNegro5") {
        this.peonNegro5.img = "./assets/ajedrez/peon_negro.png"
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "peonNegro6") {
        this.peonNegro6.img = "./assets/ajedrez/peon_negro.png"
        this.seleccionada = !this.seleccionada;
      }  
      else if(p == "peonNegro7") {
        this.peonNegro7.img = "./assets/ajedrez/peon_negro.png"
        this.seleccionada = !this.seleccionada;
      }

      else if(p == "peonBlanco0") {
        this.peonBlanco0.img = "./assets/ajedrez/peon_blanco.png"
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "peonBlanco1") {
        this.peonBlanco1.img = "./assets/ajedrez/peon_blanco.png"
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "peonBlanco2") {
        this.peonBlanco2.img = "./assets/ajedrez/peon_blanco.png"
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "peonBlanco3") {
        this.peonBlanco3.img = "./assets/ajedrez/peon_blanco.png"
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "peonBlanco4") {
        this.peonBlanco4.img = "./assets/ajedrez/peon_blanco.png"
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "peonBlanco5") {
        this.peonBlanco5.img = "./assets/ajedrez/peon_blanco.png"
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "peonBlanco6") {
        this.peonBlanco6.img = "./assets/ajedrez/peon_blanco.png"
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "peonBlanco7") {
        this.peonBlanco7.img = "./assets/ajedrez/peon_blanco.png"
        this.seleccionada = !this.seleccionada;
      }
      //alfil     
      else if(p == "alfilNegro0") {
        this.alfilNegro0.img = "./assets/ajedrez/alfil_negro.png"
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "alfilNegro1") {
        this.alfilNegro1.img = "./assets/ajedrez/alfil_negro.png"
        this.seleccionada = !this.seleccionada;
      }

      else if(p == "alfilBlanco0") {
        this.alfilBlanco0.img = "./assets/ajedrez/alfil_blanco.png"
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "alfilBlanco1") {
        this.alfilBlanco1.img = "./assets/ajedrez/alfil_blanco.png"
        this.seleccionada = !this.seleccionada;
      }
      //caballos  
      else if(p == "caballoNegro0") {
        this.caballoNegro0.img = "./assets/ajedrez/caballo_negro.png"
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "caballoNegro1") {
        this.caballoNegro1.img = "./assets/ajedrez/caballo_negro.png"
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "caballoBlanco0") {
        this.caballoBlanco0.img = "./assets/ajedrez/caballo_blanco.png"
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "caballoBlanco1") {
        this.caballoBlanco1.img = "./assets/ajedrez/caballo_blanco.png"
        this.seleccionada = !this.seleccionada;
      }
      //torres
      else if(p == "torreNegra0") {
        this.torreNegra0.img = "./assets/ajedrez/torre_negra.png"
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "torreNegra1") {
        this.torreNegra1.img = "./assets/ajedrez/torre_negra.png"
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "torreBlanca0") {
        this.torreBlanca0.img = "./assets/ajedrez/torre_blanca.png"
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "torreBlanca1") {
        this.torreBlanca1.img = "./assets/ajedrez/torre_blanca.png"
        this.seleccionada = !this.seleccionada;
      }
      //reina  
      else if(p == "reinaNegra") {
        this.reinaNegra.img = "./assets/ajedrez/reina_negra.png"
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "reinaBlanca") {
        this.reinaBlanca.img = "./assets/ajedrez/reina_blanca.png"
        this.seleccionada = !this.seleccionada;
      }
      //rey 
      else if(p == "reyNegro") {
        this.reyNegro.img = "./assets/ajedrez/rey_negro.png"
        this.seleccionada = !this.seleccionada;
      } 
      else if(p == "reyBlanco") {
        this.reyBlanco.img = "./assets/ajedrez/rey_blanco.png"
        this.seleccionada = !this.seleccionada;
      } 
    }
  }

  casilla(event:MouseEvent) {
    //que casilla hemos clickado
    this.clickX = event.clientX/this.w;
    this.clickY = event.clientY/this.h;

    //en que punto relativo a la pantalla he clickado

    this.clickX = (this.clickX*100) - 25
    this.clickY = (this.clickY*100) 

    //punto relativo al tablero

    this.clickX = this.clickX/6.25
    this.clickY = this.clickY/12.5

    this.columnFin = Math.trunc(this.clickX)
    this.filaFin = Math.trunc(this.clickY)

    this.auxX = this.columna[Math.trunc(this.clickX)]
    this.auxY = this.fila[Math.trunc(this.clickY)]    
  }


  comprobarJugada(pieza:string){
    if(this.peon()){
      //if blanco y pblanca entonces resta = 1
      //if blanco y pnegra entonces resta = -1       ini -fin
      //if negro y pblanca entonces resta = -1
      //if negro y pnegra entonces resta = 1
      //negro * color + blanco * -color
      if(this.blanco == 1 && this.tablero[this.filaIni][this.columnIni].color == -1) {
        this.puedeMover = ((this.filaIni - this.filaFin == -1) && (this.columnFin == this.columnIni) || ((this.filaIni - this.filaFin == -2) && this.filaIni == 1))
      } 
      else if(this.blanco == 1 && this.tablero[this.filaIni][this.columnIni].color == 1) {
        this.puedeMover = ((this.filaIni - this.filaFin == 1) && (this.columnFin == this.columnIni) || ((this.filaIni - this.filaFin == 2) && this.filaIni == 6))
      } 
      else if(this.negro == 1 && this.tablero[this.filaIni][this.columnIni].color == -1) {
        this.puedeMover = ((this.filaIni - this.filaFin == 1) && (this.columnFin == this.columnIni) || ((this.filaIni - this.filaFin == 2) && this.filaIni == 6))
      } 
      else if(this.negro == 1 && this.tablero[this.filaIni][this.columnIni].color == 1){
        this.puedeMover = ((this.filaIni - this.filaFin == -1) && (this.columnFin == this.columnIni) || ((this.filaIni - this.filaFin == -2) && this.filaIni == 1))
      }              


    }
    else if(this.alfil()) {
      this.puedeMover = (Math.abs(this.columnIni - this.columnFin) == Math.abs(this.filaIni - this.filaFin))
    }

    else if(this.caballo()) {
      this.puedeMover = (((Math.abs(this.columnIni - this.columnFin) == 2) && (Math.abs(this.filaIni - this.filaFin) == 1)) || 
                          ((Math.abs(this.columnIni - this.columnFin) == 1) && (Math.abs(this.filaIni - this.filaFin) == 2)))
    }

    else if(this.torre()) {
      this.puedeMover = ((this.filaIni == this.filaFin) || (this.columnIni == this.columnFin))
    }
    else if((this.pieza == "reinaNegra") || (this.pieza == "reinaBlanca")) {
      this.puedeMover = ( (Math.abs(this.columnIni - this.columnFin) == Math.abs(this.filaIni - this.filaFin)) || 
                         ((this.filaIni == this.filaFin) || (this.columnIni == this.columnFin)) )
    }
    else if((this.pieza == "reyNegro") || (this.pieza == "reyBlanco")) {
      this.puedeMover = (Math.abs(this.filaIni-this.filaFin)<=1) && (Math.abs(this.columnIni-this.columnFin) <=1)
    }

  }

  libre():boolean{
    var auxFila = this.filaIni
    var auxColumna = this.columnIni

    if(this.peon()){
      auxFila--
      while((auxFila > this.filaFin) && this.puedeMover) {
        this.puedeMover = (this.tablero[auxFila][auxColumna] == this.v)
        auxFila--
        
      }
    }

    if(this.alfil()  ||
      (this.pieza == "reinaNegra") || (this.pieza == "reinaBlanca") || (this.pieza == "reyNegro") || (this.pieza == "reyBlanco")){
      if(this.columnFin > auxColumna && this.filaFin > auxFila) {
        auxFila++
        auxColumna++
        while((auxFila < this.filaFin) && (this.puedeMover)) {
          this.puedeMover = (this.tablero[auxFila][auxColumna] == this.v)
          auxFila++
          auxColumna++

        }
      }
      else if(this.columnFin > auxColumna && this.filaFin < auxFila) {
        auxFila--
        auxColumna++
        while((auxFila > this.filaFin) && (this.puedeMover)) {
          this.puedeMover = (this.tablero[auxFila][auxColumna] == this.v)
          auxFila--
          auxColumna++

        }
      }
      else if(this.columnFin < auxColumna && this.filaFin > auxFila) {
        auxFila++
        auxColumna--
        while((auxFila < this.filaFin) && (this.puedeMover)) {
          this.puedeMover = (this.tablero[auxFila][auxColumna] == this.v)
          auxFila++
          auxColumna--

        }
      }
      else if(this.columnFin < auxColumna && this.filaFin < auxFila) {
        auxFila--
        auxColumna--
        while((auxFila > this.filaFin) && (this.puedeMover)) {
          this.puedeMover = (this.tablero[auxFila][auxColumna] == this.v)
          auxFila--
          auxColumna--

        }
      }
    }

    //caballo
    if(this.caballo()) {
      //gracias
    }

    //torres
    if(this.torre() || (this.pieza == "reinaNegra") || (this.pieza == "reinaBlanca") || (this.pieza == "reyNegro") || (this.pieza == "reyBlanco")) {
      if(auxFila == this.filaFin) {
        if(this.columnFin > auxColumna){
          auxColumna++
          while((this.columnFin > auxColumna) && (this.puedeMover)) {
            this.puedeMover = (this.tablero[auxFila][auxColumna] == this.v)
            auxColumna++
          }
        }else{
          auxColumna--
          while((this.columnFin < auxColumna) && (this.puedeMover)) {
            this.puedeMover = (this.tablero[auxFila][auxColumna] == this.v)
            auxColumna--
          }
        } 
      }
      else{
        if(this.filaFin > auxFila){
          auxFila++
          while((this.filaFin > auxFila) && (this.puedeMover)) {
            this.puedeMover = (this.tablero[auxFila][auxColumna] == this.v)
            auxFila++
          }
        }else{
          auxFila--
          while((this.filaFin < auxFila) && (this.puedeMover)) {
            this.puedeMover = (this.tablero[auxFila][auxColumna] == this.v)
            auxFila--
          }
        }
      }

    }

    return this.puedeMover
  }

  coronar(){
    if(this.peon()) {
      //tablero blanco -- pieza blanca
      if(this.blanco == 1 && this.filaFin == 0) {
        this.reinaBlanca0.col = this.columna[this.columnFin] + "%";
        this.reinaBlanca0.fil = this.fila[this.filaFin] + "%";
        this.reinaBlanca0.color = 1;
        this.reinaBlanca0.img = "./assets/ajedrez/reina_blanca.png";
        this.tablero[this.filaFin][this.columnFin].color = 0;
        this.tablero[this.filaFin][this.columnFin] = this.reinaBlanca0

     

      }
      //tablero blanco -- pieza negra
      else if(this.blanco == 1 && this.filaFin == 6) {

      }

      //tablero negro -- pieza blanca
      else if(this.negro == 1 && this.filaFin == 6) {


      }
      //tablero negro -- pieza negra
      else if(this.negro == 1 && this.filaFin == 1) {

      }
    }
  }



  mover(event:MouseEvent) {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    if(this.seleccionada) {
      
      this.casilla(event)
      if(this.tablero[this.filaFin][this.columnFin] == this.v) {
        this.comprobarJugada(this.pieza)
        this.libre()
        console.log("h0")

      } 

      //caso peon     pieza y tabler = -1, no coinciden 1
      else if(this.peon() && (this.tablero[this.filaIni][this.columnIni].color == (this.tablero[this.filaFin][this.columnFin].color * -1))){
          
        if(this.blanco == 1 && this.tablero[this.filaIni][this.columnIni].color == -1) {
          this.puedeMover = ((this.filaIni - this.filaFin == -1) && ((this.columnIni + 1 == this.columnFin) || (this.columnIni - 1 == this.columnFin)))
        } 
        else if(this.blanco == 1 && this.tablero[this.filaIni][this.columnIni].color == 1) {
          this.puedeMover = ((this.filaIni - this.filaFin == 1) && ((this.columnIni + 1 == this.columnFin) || (this.columnIni - 1 == this.columnFin)))
        } 
        else if(this.negro == 1 && this.tablero[this.filaIni][this.columnIni].color == -1) {
          this.puedeMover = ((this.filaIni - this.filaFin == 1) && ((this.columnIni + 1 == this.columnFin) || (this.columnIni - 1 == this.columnFin)))
        } 
        else if(this.negro == 1 && this.tablero[this.filaIni][this.columnIni].color == 1){
          this.puedeMover = ((this.filaIni - this.filaFin == -1) && ((this.columnIni + 1 == this.columnFin) || (this.columnIni - 1 == this.columnFin)))
        }   
        
        if(this.puedeMover)
            {this.tablero[this.filaFin][this.columnFin].color = 0 
          //this.puedeMover = true;
            }
      }

      else if(this.rey() && (this.tablero[this.filaIni][this.columnIni].color == this.tablero[this.filaFin][this.columnFin].color)){
       
        //rey blanco
        if ((this.tablero[this.filaIni][this.columnIni] == this.reyBlanco) 
         && (this.tablero[this.filaFin][this.columnFin] == this.torreBlanca0) 
         && this.enroqueBlanco0 && (this.blanco == 1)) {
            if ((this.tablero[this.filaFin][1] == this.tablero[this.filaFin][2]) 
            && (this.tablero[this.filaFin][2] == this.tablero[this.filaFin][3]) 
            && (this.tablero[this.filaFin][3] == this.v)) {

              this.tablero[this.filaFin][this.columnFin] = this.v
              this.tablero[this.filaIni][this.columnIni] = this.v
              this.tablero[this.filaFin][2] = this.reyBlanco
              this.reyBlanco.col = this.columna[2] + "%"
              this.reyBlanco.img  = "./assets/ajedrez/rey_blanco.png"
              
              this.tablero[this.filaIni][3] = this.torreBlanca0
              this.torreBlanca0.col = this.columna[3] + "%"

              this.seleccionada = !this.seleccionada
              this.puedeMover = false;
              this.turno = !this.turno

              this.enroqueBlanco0 = false
              this.enroqueBlanco1 = false

            }
         }

         if ((this.tablero[this.filaIni][this.columnIni] == this.reyBlanco) 
         && (this.tablero[this.filaFin][this.columnFin] == this.torreBlanca1) 
         && this.enroqueBlanco1 && (this.blanco == 1)) {
            if((this.tablero[this.filaFin][6] == this.tablero[this.filaFin][5]) && (this.tablero[this.filaFin][5] == this.v)) {
              
              this.tablero[this.filaFin][this.columnFin] = this.v
              this.tablero[this.filaIni][this.columnIni] = this.v
              this.tablero[this.filaFin][6] = this.reyBlanco
              this.reyBlanco.col = this.columna[6] + "%"
              this.reyBlanco.img  = "./assets/ajedrez/rey_blanco.png"

              this.tablero[this.filaIni][5] = this.torreBlanca1
              this.torreBlanca1.col = this.columna[5] + "%"

              this.seleccionada = !this.seleccionada
              this.puedeMover = false;
              this.turno = !this.turno
              
              this.enroqueBlanco0 = false
              this.enroqueBlanco1 = false

            }
         }

         if ((this.tablero[this.filaIni][this.columnIni] == this.reyBlanco) 
         && (this.tablero[this.filaFin][this.columnFin] == this.torreBlanca0) 
         && this.enroqueBlanco0 && (this.negro == 1)) {
            if ((this.tablero[this.filaFin][4] == this.tablero[this.filaFin][5]) 
            && (this.tablero[this.filaFin][5] == this.tablero[this.filaFin][6]) 
            && (this.tablero[this.filaFin][6] == this.v)) {

              this.tablero[this.filaFin][this.columnFin] = this.v
              this.tablero[this.filaIni][this.columnIni] = this.v
              this.tablero[this.filaFin][5] = this.reyBlanco
              this.reyBlanco.col = this.columna[5] + "%"
              this.reyBlanco.img  = "./assets/ajedrez/rey_blanco.png"

              this.tablero[this.filaIni][4] = this.torreBlanca0
              this.torreBlanca0.col = this.columna[4] + "%"

              this.seleccionada = !this.seleccionada
              this.puedeMover = false;
              this.turno = !this.turno

              this.enroqueBlanco0 = false
              this.enroqueBlanco1 = false

            }
         }

         if ((this.tablero[this.filaIni][this.columnIni] == this.reyBlanco) 
         && (this.tablero[this.filaFin][this.columnFin] == this.torreBlanca1) 
         && this.enroqueBlanco1 && (this.negro == 1)) {
            if ((this.tablero[this.filaFin][1] == this.tablero[this.filaFin][2]) 
            && (this.tablero[this.filaFin][2] ==  this.v)) {

              this.tablero[this.filaFin][this.columnFin] = this.v
              this.tablero[this.filaIni][this.columnIni] = this.v
              this.tablero[this.filaFin][1] = this.reyBlanco
              this.reyBlanco.col = this.columna[1] + "%"
              this.reyBlanco.img  = "./assets/ajedrez/rey_blanco.png"

              this.tablero[this.filaIni][2] = this.torreBlanca1
              this.torreBlanca1.col = this.columna[2] + "%"

              this.seleccionada = !this.seleccionada
              this.puedeMover = false;
              this.turno = !this.turno

              this.enroqueBlanco0 = false
              this.enroqueBlanco1 = false

            }
         }

        //rey negro

        if ((this.tablero[this.filaIni][this.columnIni] == this.reyNegro) 
        && (this.tablero[this.filaFin][this.columnFin] == this.torreNegra0) 
        && this.enroqueNegro0 && (this.blanco == 1)) {
            if((this.tablero[this.filaFin][6] == this.tablero[this.filaFin][5]) && (this.tablero[this.filaFin][5] == this.v)) {
              
              this.tablero[this.filaFin][this.columnFin] = this.v
              this.tablero[this.filaIni][this.columnIni] = this.v
              this.tablero[this.filaFin][6] = this.reyNegro
              this.reyNegro.col = this.columna[6] + "%"
              this.reyNegro.img  = "./assets/ajedrez/rey_negro.png"

              this.tablero[this.filaIni][5] = this.torreNegra0
              this.torreNegra0.col = this.columna[5] + "%"

              this.seleccionada = !this.seleccionada
              this.puedeMover = false;
              this.turno = !this.turno

              this.enroqueNegro0 = false
              this.enroqueNegro1 = false

            }
        }

        if ((this.tablero[this.filaIni][this.columnIni] == this.reyNegro) 
        && (this.tablero[this.filaFin][this.columnFin] == this.torreNegra1) 
        && this.enroqueNegro1 && (this.blanco == 1)) {
            if ((this.tablero[this.filaFin][1] == this.tablero[this.filaFin][2]) 
            && (this.tablero[this.filaFin][2] == this.tablero[this.filaFin][3]) 
            && (this.tablero[this.filaFin][3] == this.v)) {
              
              this.tablero[this.filaFin][this.columnFin] = this.v
              this.tablero[this.filaIni][this.columnIni] = this.v
              this.tablero[this.filaFin][2] = this.reyNegro
              this.reyNegro.col = this.columna[2] + "%"
              this.reyNegro.img  = "./assets/ajedrez/rey_negro.png"

              this.tablero[this.filaIni][3] = this.torreNegra1
              this.torreNegra1.col = this.columna[3] + "%"

              this.seleccionada = !this.seleccionada
              this.puedeMover = false;
              this.turno = !this.turno

              this.enroqueNegro0 = false
              this.enroqueNegro1 = false

            }
        }

        if ((this.tablero[this.filaIni][this.columnIni] == this.reyNegro) 
        && (this.tablero[this.filaFin][this.columnFin] == this.torreNegra0) 
        && this.enroqueNegro0 && (this.negro == 1)) {
            if ((this.tablero[this.filaFin][1] == this.tablero[this.filaFin][2]) 
            && (this.tablero[this.filaFin][2] ==  this.v)) {

              this.tablero[this.filaFin][this.columnFin] = this.v
              this.tablero[this.filaIni][this.columnIni] = this.v
              this.tablero[this.filaFin][1] = this.reyNegro
              this.reyNegro.col = this.columna[1] + "%"
              this.reyNegro.img  = "./assets/ajedrez/rey_negro.png"

              this.tablero[this.filaIni][2] = this.torreNegra0
              this.torreNegra0.col = this.columna[2] + "%"

              this.seleccionada = !this.seleccionada
              this.puedeMover = false;
              this.turno = !this.turno

              this.enroqueNegro0 = false
              this.enroqueNegro1 = false

            }
        }

        if ((this.tablero[this.filaIni][this.columnIni] == this.reyNegro) 
        && (this.tablero[this.filaFin][this.columnFin] == this.torreNegra1) 
        && this.enroqueNegro1 && (this.negro == 1)) {
            if ((this.tablero[this.filaFin][4] == this.tablero[this.filaFin][5]) 
            && (this.tablero[this.filaFin][5] == this.tablero[this.filaFin][6]) 
            && (this.tablero[this.filaFin][6] == this.v)) {

              this.tablero[this.filaFin][this.columnFin] = this.v
              this.tablero[this.filaIni][this.columnIni] = this.v
              this.tablero[this.filaFin][5] = this.reyNegro
              this.reyNegro.col = this.columna[5] + "%"
              this.reyNegro.img  = "./assets/ajedrez/rey_negro.png"

              this.tablero[this.filaIni][4] = this.torreNegra1
              this.torreNegra1.col = this.columna[4] + "%"

              this.seleccionada = !this.seleccionada
              this.puedeMover = false;
              this.turno = !this.turno

              this.enroqueNegro0 = false
              this.enroqueNegro1 = false

            }
        }

      }

      else if(this.tablero[this.filaIni][this.columnIni].color == (this.tablero[this.filaFin][this.columnFin].color * -1)){
        //comer
        this.comprobarJugada(this.pieza)
        this.libre()
        if(this.puedeMover) {
          this.tablero[this.filaFin][this.columnFin].color = 0 }  
      }
      else {
        this.puedeMover = false
      }


      if(this.puedeMover) {

        this.tablero[this.filaFin][this.columnFin] = this.tablero[this.filaIni][this.columnIni]
        this.tablero[this.filaIni][this.columnIni] = this.v

        if(this.pieza == "peonNegro0") {  
          this.peonNegro0.img  = "./assets/ajedrez/peon_negro.png"    
          this.peonNegro0.fil = this.auxY.toString() + "%"
          this.peonNegro0.col =  this.auxX.toString() + "%" 
        }
  
        if(this.pieza == "peonNegro1") {
          this.peonNegro1.img  = "./assets/ajedrez/peon_negro.png"   
          this.peonNegro1.fil = this.auxY.toString() + "%"
          this.peonNegro1.col =  this.auxX.toString() + "%" 
        }
  
        if(this.pieza == "peonNegro2") {  
          this.peonNegro2.img  = "./assets/ajedrez/peon_negro.png"
          this.peonNegro2.fil = this.auxY.toString() + "%"
          this.peonNegro2.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonNegro3") {  
          this.peonNegro3.img  = "./assets/ajedrez/peon_negro.png"
          this.peonNegro3.fil = this.auxY.toString() + "%"
          this.peonNegro3.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonNegro4") {  
          this.peonNegro4.img  = "./assets/ajedrez/peon_negro.png"
          this.peonNegro4.fil = this.auxY.toString() + "%"
          this.peonNegro4.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonNegro5") {  
          this.peonNegro5.img  = "./assets/ajedrez/peon_negro.png"
          this.peonNegro5.fil = this.auxY.toString() + "%"
          this.peonNegro5.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonNegro6") {  
          this.peonNegro6.img  = "./assets/ajedrez/peon_negro.png"
          this.peonNegro6.fil = this.auxY.toString() + "%"
          this.peonNegro6.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonNegro7") {  
          this.peonNegro7.img  = "./assets/ajedrez/peon_negro.png"
          this.peonNegro7.fil = this.auxY.toString() + "%"
          this.peonNegro7.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonBlanco0") {  
          this.peonBlanco0.img  = "./assets/ajedrez/peon_blanco.png"
          this.peonBlanco0.fil = this.auxY.toString() + "%"
          this.peonBlanco0.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonBlanco1") {  
          this.peonBlanco1.img  = "./assets/ajedrez/peon_blanco.png"
          this.peonBlanco1.fil = this.auxY.toString() + "%"
          this.peonBlanco1.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonBlanco2") {  
          this.peonBlanco2.img  = "./assets/ajedrez/peon_blanco.png"
          this.peonBlanco2.fil = this.auxY.toString() + "%"
          this.peonBlanco2.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonBlanco3") {  
          this.peonBlanco3.img  = "./assets/ajedrez/peon_blanco.png"
          this.peonBlanco3.fil = this.auxY.toString() + "%"
          this.peonBlanco3.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonBlanco4") {  
          this.peonBlanco4.img  = "./assets/ajedrez/peon_blanco.png"
          this.peonBlanco4.fil = this.auxY.toString() + "%"
          this.peonBlanco4.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonBlanco5") {  
          this.peonBlanco5.img  = "./assets/ajedrez/peon_blanco.png"
          this.peonBlanco5.fil = this.auxY.toString() + "%"
          this.peonBlanco5.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonBlanco6") {  
          this.peonBlanco6.img  = "./assets/ajedrez/peon_blanco.png"
          this.peonBlanco6.fil = this.auxY.toString() + "%"
          this.peonBlanco6.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonBlanco7") {  
          this.peonBlanco7.img  = "./assets/ajedrez/peon_blanco.png"
          this.peonBlanco7.fil = this.auxY.toString() + "%"
          this.peonBlanco7.col =  this.auxX.toString() + "%" 
        }
        //alfiles
        if(this.pieza == "alfilNegro0") {
          this.alfilNegro0.img  = "./assets/ajedrez/alfil_negro.png"
          this.alfilNegro0.fil = this.auxY.toString() + "%"
          this.alfilNegro0.col =  this.auxX.toString() + "%" 
        }
        if(this.pieza == "alfilNegro1") {
          this.alfilNegro1.img  = "./assets/ajedrez/alfil_negro.png"
          this.alfilNegro1.fil = this.auxY.toString() + "%"
          this.alfilNegro1.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "alfilBlanco0") {
          this.alfilBlanco0.img  = "./assets/ajedrez/alfil_blanco.png"
          this.alfilBlanco0.fil = this.auxY.toString() + "%"
          this.alfilBlanco0.col =  this.auxX.toString() + "%" 
        }
        if(this.pieza == "alfilBlanco1") {
          this.alfilBlanco1.img  = "./assets/ajedrez/alfil_blanco.png"
          this.alfilBlanco1.fil = this.auxY.toString() + "%"
          this.alfilBlanco1.col =  this.auxX.toString() + "%" 
        }
        //caballos
        if(this.pieza == "caballoNegro0") {
          this.caballoNegro0.img  = "./assets/ajedrez/caballo_negro.png"
          this.caballoNegro0.fil = this.auxY.toString() + "%"
          this.caballoNegro0.col =  this.auxX.toString() + "%" 
        } 
        if(this.pieza == "caballoNegro1") {
          this.caballoNegro1.img  = "./assets/ajedrez/caballo_negro.png"
          this.caballoNegro1.fil = this.auxY.toString() + "%"
          this.caballoNegro1.col =  this.auxX.toString() + "%" 
        } 
        if(this.pieza == "caballoBlanco0") {
          this.caballoBlanco0.img  = "./assets/ajedrez/caballo_blanco.png"
          this.caballoBlanco0.fil = this.auxY.toString() + "%"
          this.caballoBlanco0.col =  this.auxX.toString() + "%" 
        } 
        if(this.pieza == "caballoBlanco1") {
          this.caballoBlanco1.img  = "./assets/ajedrez/caballo_blanco.png"
          this.caballoBlanco1.fil = this.auxY.toString() + "%"
          this.caballoBlanco1.col =  this.auxX.toString() + "%" 
        } 
        //torres
        if(this.pieza == "torreNegra0") {
          this.torreNegra0.img  = "./assets/ajedrez/torre_negra.png"
          this.torreNegra0.fil = this.auxY.toString() + "%"
          this.torreNegra0.col =  this.auxX.toString() + "%" 
          this.enroqueNegro0 = false
        }
        if(this.pieza == "torreNegra1") {
          this.torreNegra1.img  = "./assets/ajedrez/torre_negra.png"
          this.torreNegra1.fil = this.auxY.toString() + "%"
          this.torreNegra1.col =  this.auxX.toString() + "%" 
          this.enroqueNegro1 = false
        }
        if(this.pieza == "torreBlanca0") {
          this.torreBlanca0.img  = "./assets/ajedrez/torre_blanca.png"
          this.torreBlanca0.fil = this.auxY.toString() + "%"
          this.torreBlanca0.col =  this.auxX.toString() + "%" 
          this.enroqueBlanco0 = false
        }
        if(this.pieza == "torreBlanca1") {
          this.torreBlanca1.img  = "./assets/ajedrez/torre_blanca.png"
          this.torreBlanca1.fil = this.auxY.toString() + "%"
          this.torreBlanca1.col =  this.auxX.toString() + "%" 
          this.enroqueBlanco1 = false
        }
        //reina
        if(this.pieza == "reinaNegra") {
          this.reinaNegra.img  = "./assets/ajedrez/reina_negra.png"
          this.reinaNegra.fil = this.auxY.toString() + "%"
          this.reinaNegra.col =  this.auxX.toString() + "%" 
        }
        if(this.pieza == "reinaBlanca") {
          this.reinaBlanca.img  = "./assets/ajedrez/reina_blanca.png"
          this.reinaBlanca.fil = this.auxY.toString() + "%"
          this.reinaBlanca.col =  this.auxX.toString() + "%" 
        }

        //rey
        if(this.pieza == "reyNegro") {
          this.reyNegro.img  = "./assets/ajedrez/rey_negro.png"
          this.reyNegro.fil = this.auxY.toString() + "%"
          this.reyNegro.col =  this.auxX.toString() + "%" 
          this.enroqueNegro1 = false
          this.enroqueNegro0 = false
        }
        if(this.pieza == "reyBlanco") {
          this.reyBlanco.img  = "./assets/ajedrez/rey_blanco.png"
          this.reyBlanco.fil = this.auxY.toString() + "%"
          this.reyBlanco.col =  this.auxX.toString() + "%" 
          this.enroqueBlanco1 = false
          this.enroqueBlanco0 = false
        }
        
        this.coronar()
        this.seleccionada = !this.seleccionada
        this.puedeMover = false;
        this.turno = !this.turno
        
      }
    }
  }
}

