import { Component, OnInit } from '@angular/core';
import { pieza } from 'src/app/other/interfaces';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent {

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

tablero:pieza[][] = 
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


  pieza:string = ""

  w = window.innerWidth;
  h = window.innerHeight;

  clickY = 0;
  clickX = 0;

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

  seleccionar(p:string, event:MouseEvent) {
    
    if(!this.seleccionada) {
      if(p == "peonNegro0") {
        this.peonNegro0.img = "./assets/ajedrez/peon_azul.png"
      }
      else if(p == "peonNegro1") {
        this.peonNegro1.img = "./assets/ajedrez/peon_azul.png"
      }  
      else if(p == "peonNegro2") {
        this.peonNegro2.img = "./assets/ajedrez/peon_azul.png"
      }
      else if(p == "peonNegro3") {
        this.peonNegro3.img = "./assets/ajedrez/peon_azul.png"
      } 
      else if(p == "peonNegro4") {
        this.peonNegro4.img = "./assets/ajedrez/peon_azul.png"
      } 
      else if(p == "peonNegro5") {
        this.peonNegro5.img = "./assets/ajedrez/peon_azul.png"
      }
      else if(p == "peonNegro6") {
        this.peonNegro6.img = "./assets/ajedrez/peon_azul.png"
      }  
      else if(p == "peonNegro7") {
        this.peonNegro7.img = "./assets/ajedrez/peon_azul.png"
      }

      if(p == "peonBlanco0") {
        this.peonBlanco0.img = "./assets/ajedrez/peon_azul.png"
      }
      else if(p == "peonBlanco1") {
        this.peonBlanco1.img = "./assets/ajedrez/peon_azul.png"
      }  
      else if(p == "peonBlanco2") {
        this.peonBlanco2.img = "./assets/ajedrez/peon_azul.png"
      }
      else if(p == "peonBlanco3") {
        this.peonBlanco3.img = "./assets/ajedrez/peon_azul.png"
      } 
      else if(p == "peonBlanco4") {
        this.peonBlanco4.img = "./assets/ajedrez/peon_azul.png"
      } 
      else if(p == "peonBlanco5") {
        this.peonBlanco5.img = "./assets/ajedrez/peon_azul.png"
      }
      else if(p == "peonBlanco6") {
        this.peonBlanco6.img = "./assets/ajedrez/peon_azul.png"
      }  
      else if(p == "peonBlanco7") {
        this.peonBlanco7.img = "./assets/ajedrez/peon_azul.png"
      }

      //alfil
      else if(p == "alfilNegro0") {
        this.alfilNegro0.img = "./assets/ajedrez/alfil_azul.png"
      }
      else if(p == "alfilNegro1") {
        this.alfilNegro1.img = "./assets/ajedrez/alfil_azul.png"
      }

      else if(p == "alfilBlanco0") {
        this.alfilBlanco0.img = "./assets/ajedrez/alfil_azul.png"
      }
      else if(p == "alfilBlanco1") {
        this.alfilBlanco1.img = "./assets/ajedrez/alfil_azul.png"
      }

      //caballo
      else if(p == "caballoNegro0") {
        this.caballoNegro0.img = "./assets/ajedrez/caballo_azul.png"
      }
      else if(p == "caballoNegro1") {
        this.caballoNegro1.img = "./assets/ajedrez/caballo_azul.png"
      }
      else if(p == "caballoBlanco0") {
        this.caballoBlanco0.img = "./assets/ajedrez/caballo_azul.png"
      }
      else if(p == "caballoBlanco1") {
        this.caballoBlanco1.img = "./assets/ajedrez/caballo_azul.png"
      }
      //torres
      else if(p == "torreNegra0") {
        this.torreNegra0.img = "./assets/ajedrez/torre_azul.png"
      }
      else if(p == "torreNegra1") {
        this.torreNegra1.img = "./assets/ajedrez/torre_azul.png"
      }
      else if(p == "torreBlanca0") {
        this.torreBlanca0.img = "./assets/ajedrez/torre_azul.png"
      }
      else if(p == "torreBlanca1") {
        this.torreBlanca1.img = "./assets/ajedrez/torre_azul.png"
      }
      //reina
      else if(p == "reinaNegra") {
        this.reinaNegra.img = "./assets/ajedrez/reina_azul.png"
      }
      else if(p == "reinaBlanca") {
        this.reinaBlanca.img = "./assets/ajedrez/reina_azul.png"
      }
      //rey
      else if(p == "reyNegro") {
        this.reyNegro.img = "./assets/ajedrez/rey_azul.png"
      } 
      else if(p == "reyBlanco") {
        this.reyBlanco.img = "./assets/ajedrez/rey_azul.png"
      } 

      this.seleccionada = !this.seleccionada;
      this.pieza = p;
      this.getPosition(event);
      
    } else if(p == this.pieza){
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
    if((this.pieza == "peonNegro0") || (this.pieza == "peonNegro1") || (this.pieza == "peonNegro2") 
    || (this.pieza == "peonNegro3") || (this.pieza == "peonNegro4") || (this.pieza == "peonNegro5")
    || (this.pieza == "peonNegro6") || (this.pieza == "peonNegro7")
    || (this.pieza == "peonBlanco0") || (this.pieza == "peonBlanco1") || (this.pieza == "peonBlanco2") 
    || (this.pieza == "peonBlanco3") || (this.pieza == "peonBlanco4") || (this.pieza == "peonBlanco5")
    || (this.pieza == "peonBlanco6") || (this.pieza == "peonBlanco7")){
      this.puedeMover = (((this.filaIni - this.filaFin  == 1) || (this.filaIni - this.filaFin  == 2) && this.filaIni == 6) 
                        && (this.columnFin == this.columnIni))                

    }
    else if((this.pieza == "alfilNegro0") || ((this.pieza == "alfilNegro1")) || ((this.pieza == "alfilBlanco0")) || ((this.pieza == "alfilBlanco1"))) {
      this.puedeMover = (Math.abs(this.columnIni - this.columnFin) == Math.abs(this.filaIni - this.filaFin))
    }

    else if((this.pieza == "caballoNegro0") || ((this.pieza == "caballoNegro1")) || ((this.pieza == "caballoBlanco0")) || ((this.pieza == "caballoBlanco1"))) {
      this.puedeMover = (((Math.abs(this.columnIni - this.columnFin) == 2) && (Math.abs(this.filaIni - this.filaFin) == 1)) || 
                          ((Math.abs(this.columnIni - this.columnFin) == 1) && (Math.abs(this.filaIni - this.filaFin) == 2)))
    }

    else if((this.pieza == "torreNegra0") || ((this.pieza == "torreNegra1")) || ((this.pieza == "torreBlanca0")) || ((this.pieza == "torreBlanca1"))) {
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

  libre(){
    var auxFila = this.filaIni
    var auxColumna = this.columnIni

    if((this.pieza == "peonNegro0") || (this.pieza == "peonNegro1") || (this.pieza == "peonNegro2")
    || (this.pieza == "peonNegro3") || (this.pieza == "peonNegro4") || (this.pieza == "peonNegro5")
    || (this.pieza == "peonNegro6") || (this.pieza == "peonNegro7")
    || (this.pieza == "peonBlanco0") || (this.pieza == "peonBlanco1") || (this.pieza == "peonBlanco2") 
    || (this.pieza == "peonBlanco3") || (this.pieza == "peonBlanco4") || (this.pieza == "peonBlanco5")
    || (this.pieza == "peonBlanco6") || (this.pieza == "peonBlanco7")){
      auxFila--
      while((auxFila > this.filaFin) && this.puedeMover) {
        this.puedeMover = (this.tablero[auxFila][auxColumna] == this.v)
        auxFila--
        
      }
    }

    if((this.pieza == "alfilNegro0") || (this.pieza == "alfilNegro1") || 
      ((this.pieza == "alfilBlanco0")) || ((this.pieza == "alfilBlanco1"))  ||
      (this.pieza == "reinaNegra") || (this.pieza == "reinaBlanca")){
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
    if((this.pieza == "caballoNegro0") || (this.pieza == "caballoNegro1") || 
      (this.pieza == "caballoBlanco0") || (this.pieza == "caballoBlanco1")) {
      //gracias
    }

    //torres
    if((this.pieza == "torreNegra0") || (this.pieza == "torreNegra1") ||
      (this.pieza == "torreBlanca0") || (this.pieza == "torreBlanca1")
    || (this.pieza == "reinaNegra") || (this.pieza == "reinaBlanca")) {
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
  }

  mover(event:MouseEvent) {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    if(this.seleccionada) {
      
      this.casilla(event)
      if(this.tablero[this.filaFin][this.columnFin] == this.v) {
        this.comprobarJugada(this.pieza)
        this.libre()

      } 
      
      else if(this.tablero[this.filaIni][this.columnIni].color == (this.tablero[this.filaFin][this.columnFin].color * -1)){
        //comer
        this.comprobarJugada(this.pieza)
        this.libre()
        if(this.puedeMover)
          this.tablero[this.filaFin][this.columnFin].color = 0   
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
        }
        if(this.pieza == "torreNegra1") {
          this.torreNegra1.img  = "./assets/ajedrez/torre_negra.png"
          this.torreNegra1.fil = this.auxY.toString() + "%"
          this.torreNegra1.col =  this.auxX.toString() + "%" 
        }
        if(this.pieza == "torreBlanca0") {
          this.torreBlanca0.img  = "./assets/ajedrez/torre_blanca.png"
          this.torreBlanca0.fil = this.auxY.toString() + "%"
          this.torreBlanca0.col =  this.auxX.toString() + "%" 
        }
        if(this.pieza == "torreBlanca1") {
          this.torreBlanca1.img  = "./assets/ajedrez/torre_blanca.png"
          this.torreBlanca1.fil = this.auxY.toString() + "%"
          this.torreBlanca1.col =  this.auxX.toString() + "%" 
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
        }
        if(this.pieza == "reyBlanco") {
          this.reyBlanco.img  = "./assets/ajedrez/rey_blanco.png"
          this.reyBlanco.fil = this.auxY.toString() + "%"
          this.reyBlanco.col =  this.auxX.toString() + "%" 
        }
        
        this.seleccionada = !this.seleccionada
        this.puedeMover = false;
        
      }
    }
  }
}

