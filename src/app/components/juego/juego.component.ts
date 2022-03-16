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

  
  
  //valor para casillas vacias
  v:pieza = {"col":"", "fil":"", "img": ""};
  
  //piezas del tablero 
  peonNegro0:pieza = {"col":this.columna[0].toString() + "%", "fil":this.fila[6].toString() + "%", "img": "./assets/ajedrez/peon_negro.png"};
  peonNegro1:pieza = {"col":this.columna[1].toString() + "%", "fil":this.fila[6].toString() + "%", "img": "./assets/ajedrez/peon_negro.png"};
  peonNegro2:pieza = {"col":this.columna[2].toString() + "%", "fil":this.fila[6].toString() + "%", "img": "./assets/ajedrez/peon_negro.png"};
  peonNegro3:pieza = {"col":this.columna[3].toString() + "%", "fil":this.fila[6].toString() + "%", "img": "./assets/ajedrez/peon_negro.png"};
  peonNegro4:pieza = {"col":this.columna[4].toString() + "%", "fil":this.fila[6].toString() + "%", "img": "./assets/ajedrez/peon_negro.png"};
  peonNegro5:pieza = {"col":this.columna[5].toString() + "%", "fil":this.fila[6].toString() + "%", "img": "./assets/ajedrez/peon_negro.png"};
  
  alfilNegro0:pieza = {"col":this.columna[2].toString() + "%", "fil":this.fila[7].toString() + "%", "img": "./assets/ajedrez/alfil_negro.png"};
  caballoNegro0:pieza = {"col":this.columna[1].toString() + "%", "fil":this.fila[7].toString() + "%", "img": "./assets/ajedrez/caballo_negro.png"};
  torreNegra0:pieza = {"col":this.columna[0].toString() + "%", "fil":this.fila[7].toString() + "%", "img": "./assets/ajedrez/torre_negra.png"};
  reinaNegra:pieza = {"col":this.columna[4].toString() + "%", "fil":this.fila[7].toString() + "%", "img": "./assets/ajedrez/reina_negra.png"};
  reyNegro:pieza = {"col":this.columna[3].toString() + "%", "fil":this.fila[7].toString() + "%", "img": "./assets/ajedrez/rey_negro.png"};


  tablero:pieza[][] = 
  [
    [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
    [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
    [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
    [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
    [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
    [this.v, this.v, this.v, this.v, this.v, this.v, this.v, this.v],
    [this.peonNegro0, this.peonNegro1, this.peonNegro2, this.peonNegro3, this.peonNegro4, this.peonNegro5, this.v, this.v],
    [this.torreNegra0, this.caballoNegro0, this.alfilNegro0, this.reyNegro, this.reinaNegra, this.v, this.v, this.v]
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
      else if(p == "alfilNegro0") {
        this.alfilNegro0.img = "./assets/ajedrez/alfil_azul.png"
      }  
      else if(p == "caballoNegro0") {
        this.caballoNegro0.img = "./assets/ajedrez/caballo_azul.png"
      } 
      else if(p == "torreNegra0") {
        this.torreNegra0.img = "./assets/ajedrez/torre_azul.png"
      }   
      else if(p == "reinaNegra") {
        this.reinaNegra.img = "./assets/ajedrez/reina_azul.png"
      } 
      else if(p == "reyNegro") {
        this.reyNegro.img = "./assets/ajedrez/rey_azul.png"
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
      else if(p == "alfilNegro0") {
        this.alfilNegro0.img = "./assets/ajedrez/alfil_negro.png"
        this.seleccionada = !this.seleccionada;
      }  
      else if(p == "caballoNegro0") {
        this.caballoNegro0.img = "./assets/ajedrez/caballo_negro.png"
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "torreNegra0") {
        this.torreNegra0.img = "./assets/ajedrez/torre_negra.png"
        this.seleccionada = !this.seleccionada;
      } 
      else if(p == "reinaNegra") {
        this.reinaNegra.img = "./assets/ajedrez/reina_negra.png"
        this.seleccionada = !this.seleccionada;
      } 
      else if(p == "reyNegro") {
        this.reyNegro.img = "./assets/ajedrez/rey_negro.png"
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
    || (this.pieza == "peonNegro3") || (this.pieza == "peonNegro4") || (this.pieza == "peonNegro5")){
      this.puedeMover = (((this.filaIni - this.filaFin  == 1) || (this.filaIni - this.filaFin  == 2) && this.filaIni == 6) 
                        && (this.columnFin == this.columnIni))

      this.tablero[this.filaFin][this.columnFin] = this.tablero[this.filaIni][this.columnIni]
      this.tablero[this.filaIni][this.columnIni] = this.v                  

    }
    else if((this.pieza == "alfilNegro0") || ((this.pieza == "AB2"))) {
      this.puedeMover = (Math.abs(this.columnIni - this.columnFin) == Math.abs(this.filaIni - this.filaFin))

      this.tablero[this.filaFin][this.columnFin] = this.tablero[this.filaIni][this.columnIni]
      this.tablero[this.filaIni][this.columnIni] = this.v 
    }

    else if((this.pieza == "caballoNegro0") || ((this.pieza == "CB2"))) {
      this.puedeMover = (((Math.abs(this.columnIni - this.columnFin) == 2) && (Math.abs(this.filaIni - this.filaFin) == 1)) || 
                          ((Math.abs(this.columnIni - this.columnFin) == 1) && (Math.abs(this.filaIni - this.filaFin) == 2)))
      this.tablero[this.filaFin][this.columnFin] = this.tablero[this.filaIni][this.columnIni]
      this.tablero[this.filaIni][this.columnIni] = this.v
    }

    else if((this.pieza == "torreNegra0") || ((this.pieza == "TB2"))) {
      this.puedeMover = ((this.filaIni == this.filaFin) || (this.columnIni == this.columnFin))
      this.tablero[this.filaFin][this.columnFin] = this.tablero[this.filaIni][this.columnIni]
      this.tablero[this.filaIni][this.columnIni] = this.v
    }
    else if((this.pieza == "reinaNegra")) {
      this.puedeMover = ( (Math.abs(this.columnIni - this.columnFin) == Math.abs(this.filaIni - this.filaFin)) || 
                         ((this.filaIni == this.filaFin) || (this.columnIni == this.columnFin)) )
      this.tablero[this.filaFin][this.columnFin] = this.tablero[this.filaIni][this.columnIni]
      this.tablero[this.filaIni][this.columnIni] = this.v
    }
    else if((this.pieza == "reyNegro")) {
      this.puedeMover = (Math.abs(this.filaIni-this.filaFin)<=1) && (Math.abs(this.columnIni-this.columnFin) <=1)
      this.tablero[this.filaFin][this.columnFin] = this.tablero[this.filaIni][this.columnIni]
      this.tablero[this.filaIni][this.columnIni] = this.v
    }

  }

  libre(){
    var auxFila = this.filaIni
    var auxColumna = this.columnIni

    if((this.pieza == "peonNegro0") || (this.pieza == "peonNegro1") || (this.pieza == "peonNegro2")
    || (this.pieza == "peonNegro3") || (this.pieza == "peonNegro4") || (this.pieza == "peonNegro5")){
      while((auxFila > this.filaFin) && this.puedeMover) {
        this.puedeMover = (this.tablero[auxFila][auxColumna] == this.v)
        auxFila--
        
      }
    }

    if((this.pieza == "alfilNegro0") || (this.pieza == "AB2") || (this.pieza == "reinaNegra")){
      if(this.columnFin > auxColumna && this.filaFin > auxFila) {
        while((auxFila < this.filaFin) && (this.puedeMover)) {
          this.puedeMover = (this.tablero[auxFila][auxColumna] == this.v)
          auxFila++
          auxColumna++

        }
      }
      else if(this.columnFin > auxColumna && this.filaFin < auxFila) {
        while((auxFila > this.filaFin) && (this.puedeMover)) {
          this.puedeMover = (this.tablero[auxFila][auxColumna] == this.v)
          auxFila--
          auxColumna++

        }
      }
      else if(this.columnFin < auxColumna && this.filaFin > auxFila) {
        while((auxFila < this.filaFin) && (this.puedeMover)) {
          this.puedeMover = (this.tablero[auxFila][auxColumna] == this.v)
          auxFila++
          auxColumna--

        }
      }
      else if(this.columnFin < auxColumna && this.filaFin < auxFila) {
        while((auxFila > this.filaFin) && (this.puedeMover)) {
          this.puedeMover = (this.tablero[auxFila][auxColumna] == this.v)
          auxFila--
          auxColumna--

        }
      }
    }

    //caballo
    if((this.pieza == "caballoNegro0") || (this.pieza == "CB2")) {
      //gracias
    }

    //torres
    if((this.pieza == "torreNegra0") || (this.pieza == "TB2") || (this.pieza == "reinaNegra")) {
      if(auxFila == this.filaFin) {
        if(this.columnFin > auxColumna){
          while((this.columnFin > auxColumna) && (this.puedeMover)) {
            this.puedeMover = (this.tablero[auxFila][auxColumna] == this.v)
            auxColumna++
          }
        }else{
          while((this.columnFin < auxColumna) && (this.puedeMover)) {
            this.puedeMover = (this.tablero[auxFila][auxColumna] == this.v)
            auxColumna--
          }
        }
      }
      else{
        if(this.filaFin > auxFila){
          while((this.filaFin > auxFila) && (this.puedeMover)) {
            this.puedeMover = (this.tablero[auxFila][auxColumna] == this.v)
            auxFila++
          }
        }else{
          while((this.filaFin < auxFila) && (this.puedeMover)) {
            this.puedeMover = (this.tablero[auxFila][auxColumna] == this.v)
            auxFila--
          }
        }
      }

    }


    if(!this.puedeMover) {
      this.tablero[this.filaIni][this.columnIni] = this.tablero[this.filaFin][this.columnFin]
      this.tablero[this.filaFin][this.columnFin] = this.v
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
      } else {
        this.puedeMover = false
      }


      if(this.puedeMover) {

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

        if(this.pieza == "alfilNegro0") {
          this.alfilNegro0.img  = "./assets/ajedrez/alfil_negro.png"
          this.alfilNegro0.fil = this.auxY.toString() + "%"
          this.alfilNegro0.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "caballoNegro0") {
          this.caballoNegro0.img  = "./assets/ajedrez/caballo_negro.png"
          this.caballoNegro0.fil = this.auxY.toString() + "%"
          this.caballoNegro0.col =  this.auxX.toString() + "%" 
        } 

        if(this.pieza == "torreNegra0") {
          this.torreNegra0.img  = "./assets/ajedrez/torre_negra.png"
          this.torreNegra0.fil = this.auxY.toString() + "%"
          this.torreNegra0.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "reinaNegra") {
          this.reinaNegra.img  = "./assets/ajedrez/reina_negra.png"
          this.reinaNegra.fil = this.auxY.toString() + "%"
          this.reinaNegra.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "reyNegro") {
          this.reyNegro.img  = "./assets/ajedrez/rey_negro.png"
          this.reyNegro.fil = this.auxY.toString() + "%"
          this.reyNegro.col =  this.auxX.toString() + "%" 
        }
        
        this.seleccionada = !this.seleccionada
        this.puedeMover = false;
        
      }
    }
  }
}

