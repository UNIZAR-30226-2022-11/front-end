import { Component, OnInit } from '@angular/core';
import { pieza } from 'src/app/other/interfaces';
import { ViewChild } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit{

  constructor(
		private socketService: SocketService 
	) { }

  ngOnInit(): void {
    if(JuegoComponent.online) {
      this.online()
    } else {
      this.elegirLado(true)
    }
  }


  ////////////////////////////////////////////////////////////

  //TIMER

  ///////////////////////////////////////////////////////////



  //variables estaticas del timer
  static segundos = 0;
  static minutos = 0;
  //variable estática de victoria
  static finTiempo = false;

  static ia:boolean = false;
  static online:boolean = false;


  opponent:string = ""
  miTurno:boolean = true;  //si no es mi turno no puedo seleccionar
  
  online():void {
      this.socketService.getOpponent().subscribe((data: any) => {
        this.opponent = data.op
        if(data.side == "1"){ //si soy blanco
          this.miTurno = true; //mi turno
          this.elegirLado(this.miTurno) // lado config para blancas
          this.start(); //empieza timer
        } else {
          this.miTurno = false; // no es mi turno
          this.elegirLado(this.miTurno) //config para negras
          this.start(); // empieza su timer
        }
      
      })

      if(!this.miTurno){
        //esperar su movimiento
            this.socketService.getGameMove().subscribe((data: any) => {
            this.filaIni = data.fI
            this.columnIni = data.cI
            this.filaFin = data.fF
            this.columnFin = data.cF
          //mover pieza
          this.moverRival()

          this.miTurno = true;
          {this.seleccionada = !this.seleccionada
          this.puedeMover = false;
          this.cambiarTimer();
          this.turno = !this.turno}
          
          })
      }
  }

  moverRival():void{
    this.tablero[this.filaFin][this.columnFin] = this.tablero[this.filaIni][this.columnIni]
    this.tablero[this.filaIni][this.columnIni] = this.v
  }

  @ViewChild(TimerComponent)
  timer!: TimerComponent;

  start(){this.timer.start();}  //timer 1 es de las blancas
  start2(){this.timer.start2();}  //timer 2 es de las negras

  tiempoAcabado():boolean{
    if(JuegoComponent.minutos == 0 && JuegoComponent.segundos==0) {return true}
    return false
  }

  //paramos el timer antes de pasar el turno
  cambiarTimer(){
    if(this.tiempoAcabado()) {return}
    if(this.turno) {
      this.timer.stop();
      this.timer.start2();
    } 
    else {
      this.timer.stop2();
      this.timer.start();
    }
  }

  cambiarPosicionTimer(){
    this.timer.blancas = this.blanco*80+10;
    this.timer.negras = this.negro*80+10;
  }

  resetTimer(){
    this.cambiarPosicionTimer()

    this.timer.stop();
    this.timer.stop2();

    this.timer.resetTimer();
  }

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

  ganar:boolean = false;

  //valor para casillas vacias
  v:pieza = {"col":"", "fil":"", "img": "", "color":0};
  
  //piezas del tablero 

  tableroImg:string = "./assets/ajedrez/tablero.png"

  static peonBlanco:string = "./assets/ajedrez/peon_blanco.png"
  static alfilBlanco:string = "./assets/ajedrez/alfil_blanco.png"
  static caballoBlanco:string = "./assets/ajedrez/caballo_blanco.png"
  static torreBlanca:string = "./assets/ajedrez/torre_blanca.png"
  static reinaBlanca:string = "./assets/ajedrez/reina_blanca.png"
  static reyBlanco:string = "./assets/ajedrez/rey_blanco.png"

  static peonNegro:string = "./assets/ajedrez/peon_negro.png"
  static alfilNegro:string = "./assets/ajedrez/alfil_negro.png"
  static caballoNegro:string = "./assets/ajedrez/caballo_negro.png"
  static torreNegra:string = "./assets/ajedrez/torre_negra.png"
  static reinaNegra:string = "./assets/ajedrez/reina_negra.png"
  static reyNegro:string = "./assets/ajedrez/rey_negro.png"
  //negras

  peonNegro0:pieza = {"col":this.columna[(this.blanco*7)+(0*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": JuegoComponent.peonNegro, "color":-1};
  peonNegro1:pieza = {"col":this.columna[(this.blanco*6)+1*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": JuegoComponent.peonNegro, "color":-1};
  peonNegro2:pieza = {"col":this.columna[(this.blanco*5)+2*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": JuegoComponent.peonNegro, "color":-1};
  peonNegro3:pieza = {"col":this.columna[(this.blanco*4)+3*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": JuegoComponent.peonNegro, "color":-1};
  peonNegro4:pieza = {"col":this.columna[(this.blanco*3)+4*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": JuegoComponent.peonNegro, "color":-1};
  peonNegro5:pieza = {"col":this.columna[(this.blanco*2)+5*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": JuegoComponent.peonNegro, "color":-1};
  peonNegro6:pieza = {"col":this.columna[(this.blanco*1)+6*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": JuegoComponent.peonNegro, "color":-1};
  peonNegro7:pieza = {"col":this.columna[(this.blanco*0)+7*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": JuegoComponent.peonNegro, "color":-1};
  
  alfilNegro0:pieza = {"col":this.columna[(this.blanco*5)+(2*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": JuegoComponent.alfilNegro, "color":-1};
  alfilNegro1:pieza = {"col":this.columna[(this.blanco*2)+(5*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": JuegoComponent.alfilNegro, "color":-1};
 
  caballoNegro0:pieza = {"col":this.columna[(this.blanco*6)+(1*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": JuegoComponent.caballoNegro, "color":-1};
  caballoNegro1:pieza = {"col":this.columna[(this.blanco*1)+(6*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": JuegoComponent.caballoNegro, "color":-1};
  
  torreNegra0:pieza = {"col":this.columna[(this.blanco*7)+(0*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": JuegoComponent.torreNegra, "color":-1};
  torreNegra1:pieza = {"col":this.columna[(this.blanco*0)+(7*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": JuegoComponent.torreNegra, "color":-1};
  
  reinaNegra:pieza = {"col":this.columna[(this.blanco*3)+(3*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": JuegoComponent.reinaNegra, "color":-1};
  reyNegro:pieza = {"col":this.columna[(this.blanco*4)+(4*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": JuegoComponent.reyNegro, "color":-1};

  //blancas
  peonBlanco0:pieza = {"col":this.columna[(this.blanco*0)+(7*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": JuegoComponent.peonBlanco, "color":1};
  peonBlanco1:pieza = {"col":this.columna[(this.blanco*1)+(6*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": JuegoComponent.peonBlanco, "color":1};
  peonBlanco2:pieza = {"col":this.columna[(this.blanco*2)+(5*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": JuegoComponent.peonBlanco, "color":1};
  peonBlanco3:pieza = {"col":this.columna[(this.blanco*3)+(4*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": JuegoComponent.peonBlanco, "color":1};
  peonBlanco4:pieza = {"col":this.columna[(this.blanco*4)+(3*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": JuegoComponent.peonBlanco, "color":1};
  peonBlanco5:pieza = {"col":this.columna[(this.blanco*5)+(2*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": JuegoComponent.peonBlanco, "color":1};
  peonBlanco6:pieza = {"col":this.columna[(this.blanco*6)+(1*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": JuegoComponent.peonBlanco, "color":1};
  peonBlanco7:pieza = {"col":this.columna[(this.blanco*7)+(0*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": JuegoComponent.peonBlanco, "color":1};
 
  alfilBlanco0:pieza = {"col":this.columna[(this.blanco*2)+(5*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": JuegoComponent.alfilBlanco, "color":1};
  alfilBlanco1:pieza = {"col":this.columna[(this.blanco*5)+(2*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": JuegoComponent.alfilBlanco, "color":1};
 
  caballoBlanco0:pieza = {"col":this.columna[(this.blanco*1)+(6*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": JuegoComponent.caballoBlanco, "color":1};
  caballoBlanco1:pieza = {"col":this.columna[(this.blanco*6)+(1*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": JuegoComponent.caballoBlanco, "color":1};
 
  torreBlanca0:pieza = {"col":this.columna[(this.blanco*0)+(7*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": JuegoComponent.torreBlanca, "color":1};
  torreBlanca1:pieza = {"col":this.columna[(this.blanco*7)+(0*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": JuegoComponent.torreBlanca, "color":1};
  
  reinaBlanca:pieza = {"col":this.columna[(this.blanco*3)+(4*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": JuegoComponent.reinaBlanca, "color":1};
  reinaBlanca0:pieza = {"col":"", "fil":"", "img": "", "color":0};
  
  reyBlanco:pieza = {"col":this.columna[(this.blanco*4)+(3*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": JuegoComponent.reyBlanco, "color":1};
  

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
    this.resetTimer()
    if(JuegoComponent.ia)
      this.IA()
  }

  elegirLado(blanco:boolean){
    if(blanco) {
      //console.log("buenas")
      this.tablero = this.tableroBlanco;
      this.blanco = 1
      this.negro = 0
    }
    else {
      //console.log("malas")
      //this.tablero = this.tableroNegro;
      this.blanco = 0
      this.negro = 1
    }

      //piezas del tablero 



    //negras

    this.peonNegro0 = {"col":this.columna[(this.blanco*7)+(0*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": JuegoComponent.peonNegro, "color":-1};
    this.peonNegro1 = {"col":this.columna[(this.blanco*6)+1*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": JuegoComponent.peonNegro, "color":-1};
    this.peonNegro2 = {"col":this.columna[(this.blanco*5)+2*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": JuegoComponent.peonNegro, "color":-1};
    this.peonNegro3 = {"col":this.columna[(this.blanco*4)+3*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": JuegoComponent.peonNegro, "color":-1};
    this.peonNegro4 = {"col":this.columna[(this.blanco*3)+4*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": JuegoComponent.peonNegro, "color":-1};
    this.peonNegro5 = {"col":this.columna[(this.blanco*2)+5*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": JuegoComponent.peonNegro, "color":-1};
    this.peonNegro6 = {"col":this.columna[(this.blanco*1)+6*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": JuegoComponent.peonNegro, "color":-1};
    this.peonNegro7 = {"col":this.columna[(this.blanco*0)+7*this.negro].toString() + "%", "fil":this.fila[(this.blanco*1)+6*this.negro].toString() + "%", "img": JuegoComponent.peonNegro, "color":-1};
    
    this.alfilNegro0 = {"col":this.columna[(this.blanco*5)+(2*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": JuegoComponent.alfilNegro, "color":-1};
    this.alfilNegro1 = {"col":this.columna[(this.blanco*2)+(5*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": JuegoComponent.alfilNegro, "color":-1};
  
    this.caballoNegro0 = {"col":this.columna[(this.blanco*6)+(1*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": JuegoComponent.caballoNegro, "color":-1};
    this.caballoNegro1 = {"col":this.columna[(this.blanco*1)+(6*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": JuegoComponent.caballoNegro, "color":-1};
    
    this.torreNegra0 = {"col":this.columna[(this.blanco*7)+(0*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": JuegoComponent.torreNegra, "color":-1};
    this.torreNegra1 = {"col":this.columna[(this.blanco*0)+(7*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": JuegoComponent.torreNegra, "color":-1};
    
    this.reinaNegra = {"col":this.columna[(this.blanco*3)+(4*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": JuegoComponent.reinaNegra, "color":-1};
    this.reyNegro = {"col":this.columna[(this.blanco*4)+(3*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*0)+(7*this.negro)].toString() + "%", "img": JuegoComponent.reyNegro, "color":-1};

    //blancas
    this.peonBlanco0 = {"col":this.columna[(this.blanco*0)+(7*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": JuegoComponent.peonBlanco, "color":1};
    this.peonBlanco1 = {"col":this.columna[(this.blanco*1)+(6*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": JuegoComponent.peonBlanco, "color":1};
    this.peonBlanco2 = {"col":this.columna[(this.blanco*2)+(5*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": JuegoComponent.peonBlanco, "color":1};
    this.peonBlanco3 = {"col":this.columna[(this.blanco*3)+(4*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": JuegoComponent.peonBlanco, "color":1};
    this.peonBlanco4 = {"col":this.columna[(this.blanco*4)+(3*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": JuegoComponent.peonBlanco, "color":1};
    this.peonBlanco5 = {"col":this.columna[(this.blanco*5)+(2*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": JuegoComponent.peonBlanco, "color":1};
    this.peonBlanco6 = {"col":this.columna[(this.blanco*6)+(1*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": JuegoComponent.peonBlanco, "color":1};
    this.peonBlanco7 = {"col":this.columna[(this.blanco*7)+(0*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*6)+(1*this.negro)].toString() + "%", "img": JuegoComponent.peonBlanco, "color":1};
  
    this.alfilBlanco0 = {"col":this.columna[(this.blanco*2)+(5*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": JuegoComponent.alfilBlanco, "color":1};
    this.alfilBlanco1 = {"col":this.columna[(this.blanco*5)+(2*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": JuegoComponent.alfilBlanco, "color":1};
  
    this.caballoBlanco0 = {"col":this.columna[(this.blanco*1)+(6*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": JuegoComponent.caballoBlanco, "color":1};
    this.caballoBlanco1 = {"col":this.columna[(this.blanco*6)+(1*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": JuegoComponent.caballoBlanco, "color":1};
  
    this.torreBlanca0 = {"col":this.columna[(this.blanco*0)+(7*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": JuegoComponent.torreBlanca, "color":1};
    this.torreBlanca1 = {"col":this.columna[(this.blanco*7)+(0*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": JuegoComponent.torreBlanca, "color":1};
    
    this.reinaBlanca = {"col":this.columna[(this.blanco*3)+(4*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": JuegoComponent.reinaBlanca, "color":1};
    this.reyBlanco = {"col":this.columna[(this.blanco*4)+(3*this.negro)].toString() + "%", "fil":this.fila[(this.blanco*7)+(0*this.negro)].toString() + "%", "img": JuegoComponent.reyBlanco, "color":1};
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

  reina():boolean{
    if((this.pieza == "reinaNegra") || (this.pieza == "reinaBlanca")){
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

  /*        
  this.puedeMover = ((this.filaIni - this.filaFin == -1) && ((this.columnIni + 1 == this.columnFin) || (this.columnIni - 1 == this.columnFin)))
  this.puedeMover = ((this.filaIni - this.filaFin == 1) && ((this.columnIni + 1 == this.columnFin) || (this.columnIni - 1 == this.columnFin)))
  this.puedeMover = ((this.filaIni - this.filaFin == 1) && ((this.columnIni + 1 == this.columnFin) || (this.columnIni - 1 == this.columnFin)))
  this.puedeMover = ((this.filaIni - this.filaFin == -1) && ((this.columnIni + 1 == this.columnFin) || (this.columnIni - 1 == this.columnFin)))
    */

  ////////////////////////////////////////////////////////////

  //AMENAZAR PIEZAS

  ///////////////////////////////////////////////////////////
  amenazar:boolean = false

  //la IA comprueba todos los jaques a las piezas del rival, si uno da != this.v entomces mueve

  IA(){
    if(this.turno == true && this.negro == 1){ //turno = true para blancas, busca el jaque a las negras(ia es blanca) 
      
      var aux:pieza = this.jaque(this.reyNegro)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.reyNegro)
        var colFin:number = this.obtenerColumna(this.reyNegro)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      
      var aux:pieza = this.jaque(this.reinaNegra)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.reinaNegra)
        var colFin:number = this.obtenerColumna(this.reinaNegra)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }

      var aux:pieza = this.jaque(this.torreNegra0)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.torreNegra0)
        var colFin:number = this.obtenerColumna(this.torreNegra0)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      var aux:pieza = this.jaque(this.torreNegra1)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.torreNegra1)
        var colFin:number = this.obtenerColumna(this.torreNegra1)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }

      var aux:pieza = this.jaque(this.caballoNegro0)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.caballoNegro0)
        var colFin:number = this.obtenerColumna(this.caballoNegro0)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      var aux:pieza = this.jaque(this.caballoNegro1)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.caballoNegro1)
        var colFin:number = this.obtenerColumna(this.caballoNegro1)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }

      var aux:pieza = this.jaque(this.alfilNegro0)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.alfilNegro0)
        var colFin:number = this.obtenerColumna(this.alfilNegro0)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      var aux:pieza = this.jaque(this.alfilNegro1)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.alfilNegro1)
        var colFin:number = this.obtenerColumna(this.alfilNegro1)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }

      var aux:pieza = this.jaque(this.peonNegro0)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.peonNegro0)
        var colFin:number = this.obtenerColumna(this.peonNegro0)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      var aux:pieza = this.jaque(this.peonNegro1)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.peonNegro1)
        var colFin:number = this.obtenerColumna(this.peonNegro1)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      var aux:pieza = this.jaque(this.peonNegro2)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.peonNegro2)
        var colFin:number = this.obtenerColumna(this.peonNegro2)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      var aux:pieza = this.jaque(this.peonNegro3)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.peonNegro3)
        var colFin:number = this.obtenerColumna(this.peonNegro3)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      var aux:pieza = this.jaque(this.peonNegro4)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.peonNegro4)
        var colFin:number = this.obtenerColumna(this.peonNegro4)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      var aux:pieza = this.jaque(this.peonNegro5)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.peonNegro5)
        var colFin:number = this.obtenerColumna(this.peonNegro5)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      var aux:pieza = this.jaque(this.peonNegro6)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.peonNegro6)
        var colFin:number = this.obtenerColumna(this.peonNegro6)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      var aux:pieza = this.jaque(this.peonNegro7)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.peonNegro7)
        var colFin:number = this.obtenerColumna(this.peonNegro7)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }

      //////////////////////////////////////
      //NO PUEDE COMER
      /////////////////////////////////////

      //seleccionar una pieza blanca
      var piezaMover:pieza = this.getBlanca()
      while(!this.moverPieza(piezaMover)){
        piezaMover = this.getBlanca()
      }
      this.cambiarTimer()
      this.turno = !this.turno
      return
    } 
      //////////////////////////////////////
      //TURNO DE LAS NEGRAS
      /////////////////////////////////////
    else if (this.turno == false && this.blanco == 1){
      //turno = true para blancas, busca el jaque a las negras(ia es blanca) 
            
      var aux:pieza = this.jaque(this.reyBlanco)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.reyBlanco)
        var colFin:number = this.obtenerColumna(this.reyBlanco)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      
      var aux:pieza = this.jaque(this.reinaBlanca)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.reinaBlanca)
        var colFin:number = this.obtenerColumna(this.reinaBlanca)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }

      var aux:pieza = this.jaque(this.torreBlanca0)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.torreBlanca0)
        var colFin:number = this.obtenerColumna(this.torreBlanca0)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      var aux:pieza = this.jaque(this.torreBlanca1)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.torreBlanca1)
        var colFin:number = this.obtenerColumna(this.torreBlanca1)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }

      var aux:pieza = this.jaque(this.caballoBlanco0)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.caballoBlanco0)
        var colFin:number = this.obtenerColumna(this.caballoBlanco0)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      var aux:pieza = this.jaque(this.caballoBlanco1)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.caballoBlanco1)
        var colFin:number = this.obtenerColumna(this.caballoBlanco1)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }

      var aux:pieza = this.jaque(this.alfilBlanco0)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.alfilBlanco0)
        var colFin:number = this.obtenerColumna(this.alfilBlanco0)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      var aux:pieza = this.jaque(this.alfilBlanco1)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.alfilBlanco1)
        var colFin:number = this.obtenerColumna(this.alfilBlanco1)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }

      var aux:pieza = this.jaque(this.peonBlanco0)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.peonBlanco0)
        var colFin:number = this.obtenerColumna(this.peonBlanco0)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      var aux:pieza = this.jaque(this.peonBlanco1)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.peonBlanco1)
        var colFin:number = this.obtenerColumna(this.peonBlanco1)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      var aux:pieza = this.jaque(this.peonBlanco2)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.peonBlanco2)
        var colFin:number = this.obtenerColumna(this.peonBlanco2)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      var aux:pieza = this.jaque(this.peonBlanco3)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.peonBlanco3)
        var colFin:number = this.obtenerColumna(this.peonBlanco3)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      var aux:pieza = this.jaque(this.peonBlanco4)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.peonBlanco4)
        var colFin:number = this.obtenerColumna(this.peonBlanco4)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      var aux:pieza = this.jaque(this.peonBlanco5)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.peonBlanco5)
        var colFin:number = this.obtenerColumna(this.peonBlanco5)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      var aux:pieza = this.jaque(this.peonBlanco6)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.peonBlanco6)
        var colFin:number = this.obtenerColumna(this.peonBlanco6)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }
      var aux:pieza = this.jaque(this.peonBlanco7)
      if(aux != this.v){
        var filIni:number = this.obtenFila(aux)
        var colIni:number = this.obtenerColumna(aux)
        var filFin:number = this.obtenFila(this.peonBlanco7)
        var colFin:number = this.obtenerColumna(this.peonBlanco7)

        //mover la pieza
        this.tablero[filFin][colFin].color = 0  //borro destino
        this.tablero[filFin][colFin] = this.tablero[filIni][colIni]   //muevo en la matriz
        this.tablero[filFin][colFin].col = this.columna[colFin] + "%" //desde la matriz cambio fila y col
        this.tablero[filFin][colFin].fil = this.fila[filFin] + "%"

        //impiar casilla inicial
        this.tablero[filIni][colIni] = this.v
        //cambiar timer
        this.cambiarTimer()
        //pasar turno
        this.turno = !this.turno
        return
      }

      //////////////////////////////////////
      //NO PUEDE COMER
      /////////////////////////////////////

      //seleccionar una pieza blanca
      var piezaMover:pieza = this.getNegra()
      while(!this.moverPieza(piezaMover)){
        piezaMover = this.getNegra()
      }
      this.cambiarTimer()
      this.turno = !this.turno
      return
    }
    
    //this.cambiarTimer()
    //this.turno != this.turno
    return
  }
///////////////////////////////////////////////
///////////////////////////////////////
//FUNCIONES PARA LA IA
randomInt(min:number, max:number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

getBlanca():pieza{
  var vector:pieza[] = [this.peonBlanco0, this.peonBlanco1, this.peonBlanco2, this.peonBlanco3, this.peonBlanco4, this.peonBlanco5,
                    this.peonBlanco6, this.peonBlanco7, this.alfilBlanco0, this.alfilBlanco1, this.caballoBlanco0, this.caballoBlanco1,
                    this.torreBlanca0, this.torreBlanca1, this.reinaBlanca]
 
  var num:number = this.randomInt(0, 14);

  while(vector[num].color == 0) {
    num = this.randomInt(0, 14);
  }
  return vector[num];
}

getNegra():pieza{
var vector:pieza[] = [this.peonNegro0, this.peonNegro1, this.peonNegro2, this.peonNegro3, this.peonNegro4, this.peonNegro5,
    this.peonNegro6, this.peonNegro7, this.alfilNegro0, this.alfilNegro1, this.caballoNegro0, this.caballoNegro1,
    this.torreNegra0, this.torreNegra1, this.reinaNegra]

var num:number = this.randomInt(0, 14);

while(vector[num].color == 0) {
num = this.randomInt(0, 14);
}
return vector[num];
}

moverPieza(pieza:pieza):boolean{
  //diferenciar pieza
  this.pieza = this.piezaToString(pieza);
  if(this.peon()){
    //asignar filaFin y colFin
    this.filaFin = this.obtenFila(pieza)
    this.columnFin = this.obtenerColumna(pieza)
    if(pieza.color == 1){ //peones blancos
      if(this.blanco == 1){
        if(this.tablero[this.filaFin - 1][this.columnFin] == this.v){
          //console.log("dentro0")
          this.filaFin--
        }
        else {
          return false;
        }
      }
      else {
        if(this.tablero[this.filaFin + 1][this.columnFin] == this.v){
          //console.log("dentro0")
          this.filaFin++
        }
        else {
          return false;
        }
      }
    }
    else  //peones negros
    {
      if(this.blanco){
        if(this.tablero[this.filaFin + 1][this.columnFin] == this.v){
          //console.log("dentro0")
          this.filaFin++
        }
        else {
          return false;
        }
      }
      else
      {
        if(this.tablero[this.filaFin + 1][this.columnFin] == this.v){
          //console.log("dentro0")
          this.filaFin--
        }
        else {
          return false;
        }
      }
    }
    this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
    this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
    this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
    this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
    aux = 5;
    return true
  }
  else if(this.alfil()){
    var aux = this.randomInt(0, 3);
    var cont = 0
    while(cont < 4) {
      //asignar filaFin y colFin
      this.filaFin = this.obtenFila(pieza)
      this.columnFin = this.obtenerColumna(pieza)
      if(aux == 0){
        ////console.log("ini0")
        while(this.filaFin + 1 <= 7 && this.columnFin + 1 <= 7) {
          if(this.tablero[this.filaFin + 1][this.columnFin + 1] == this.v){
            //console.log("dentro0")
            this.filaFin++
            this.columnFin++
          }
          else {
            //console.log("0")
            break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual0")
          aux++
          cont++
        }
        else {
          //console.log("aqui0")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 5;
          return true
        }
      }
      else if(aux == 1){
        //console.log("ini1")
        while(this.filaFin - 1 >= 0 && this.columnFin + 1 <= 7) {
          if(this.tablero[this.filaFin - 1][this.columnFin + 1] == this.v){
            //console.log("dentro1")
            this.filaFin--
            this.columnFin++
          }
          else {
            //console.log("1")
            break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual1")
          aux++
          cont++
        }
        else {
          //console.log("aqui1")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 5;
          return true
        }
      }
      else if(aux == 2){
        //console.log("ini2")
        while(this.filaFin + 1 <= 7 && this.columnFin - 1 >= 0) {
          if(this.tablero[this.filaFin + 1][this.columnFin - 1] == this.v){
            //console.log("dentro2")
            this.filaFin++
            this.columnFin--
          }
          else {
            //console.log("2")
            break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual2")
          aux++
          cont++
        }
        else {
          //console.log("aqui2")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 5;
          return true
        }
      }
      else if(aux == 3){
        //console.log("ini3")
        while(this.filaFin - 1 >= 0 && this.columnFin - 1 >= 0) {
          if(this.tablero[this.filaFin - 1][this.columnFin - 1] == this.v){
            //console.log("dentro3")
            this.filaFin--
            this.columnFin--
          }
          else {
            //console.log("3")
            break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual3")
          aux = 0
          cont++
        }
        else {
          //console.log("aqui3")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 5;
          return true
        }
      }

    }
  }
  else if(this.caballo())
  {
    var aux = this.randomInt(0, 7);
    //console.log(aux)
    var cont = 0
    while(cont < 8) {
      //console.log("cont")
      //console.log(cont)
      //asignar filaFin y colFin
      this.filaFin = this.obtenFila(pieza)
      this.columnFin = this.obtenerColumna(pieza)
      if(aux == 0){
        //console.log("ini0")
        if(this.filaFin + 1 <= 7 && this.columnFin + 2 <= 7) {
          if(this.tablero[this.filaFin + 1][this.columnFin + 2] == this.v){
            //console.log("dentro0")
            this.filaFin++
            this.columnFin += 2
          }
          else {
            //console.log("0")
            //break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual0")
          aux++
          cont++
        }
        else {
          //console.log("aqui0")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 10;
          return true
        }
      }
      else if(aux == 1){
        //console.log("ini1")
        if(this.filaFin - 1 >= 0 && this.columnFin + 2 <= 7) {
          if(this.tablero[this.filaFin - 1][this.columnFin + 2] == this.v){
            //console.log("dentro1")
            this.filaFin--
            this.columnFin += 2
          }
          else {
            //console.log("1")
            //break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual1")
          aux++
          cont++
        }
        else {
          //console.log("aqui1")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 10;
          return true
        }
      }
      else if(aux == 2){
        //console.log("ini2")
        if(this.filaFin + 1 <= 7 && this.columnFin - 2 >= 0) {
          if(this.tablero[this.filaFin + 1][this.columnFin - 2] == this.v){
            //console.log("dentro2")
            this.filaFin++
            this.columnFin -= 2
          }
          else {
            //console.log("2")
            //break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual2")
          aux++
          cont++
        }
        else {
          //console.log("aqui2")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 10;
          return true
        }
      }
      else if(aux == 3){
        //console.log("ini3")
        if(this.filaFin - 1 >= 0 && this.columnFin - 2 >= 0) {
          if(this.tablero[this.filaFin - 1][this.columnFin - 2] == this.v){
            //console.log("dentro3")
            this.filaFin--
            this.columnFin -= 2
          }
          else {
            //console.log("3")
            //break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual3")
          aux++
          cont++
        }
        else {
          //console.log("aqui3")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 10;
          return true
        }
      }
      else if(aux == 4){
        //console.log("ini4")
        if(this.filaFin + 2 <= 7 && this.columnFin + 1 <= 7) {
          if(this.tablero[this.filaFin + 2][this.columnFin+1] == this.v){
            //console.log("dentro0")
            this.filaFin += 2
            this.columnFin++
          }
          else {
            //console.log("0")
            //break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual0")
          aux++
          cont++
        }
        else {
          //console.log("aqui0")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 10;
          return true
        }
      }
      else if(aux == 5){
        //console.log("ini5")
        if(this.filaFin + 2 <= 7 && this.columnFin - 1 >= 0 ) {
          if(this.tablero[this.filaFin + 2][this.columnFin - 1] == this.v){
            //console.log("dentro1")
            this.filaFin += 2
            this.columnFin--
          }
          else {
            //console.log("1")
            //break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual1")
          aux++
          cont++
        }
        else {
          //console.log("aqui1")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 10;
          return true
        }
      }
      else if(aux == 6){
        //console.log("ini6")
        if(this.filaFin - 2 >= 0 && this.columnFin + 1 <= 7) {
          if(this.tablero[this.filaFin - 2][this.columnFin + 1] == this.v){
            //console.log("dentro2")
            this.filaFin -= 2
            this.columnFin++
          }
          else {
            //console.log("2")
            //break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual2")
          aux++
          cont++
        }
        else {
          //console.log("aqui2")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 10;
          return true
        }
      }
      else if(aux == 7){
        //console.log("ini7")
        if(this.filaFin - 2 >= 0 && this.columnFin - 1 >= 0) {
          if(this.tablero[this.filaFin - 2][this.columnFin - 1] == this.v){
            //console.log("dentro3")
            this.filaFin -= 2
            this.columnFin--
          }
          else {
            //console.log("3")
            //break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual3")
          aux = 0
          cont++
        }
        else {
          //console.log("aqui3")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 10;
          return true
        }
      }

    }
  }
  
  else if(this.torre()){
    
    var aux = this.randomInt(0, 3);
    var cont = 0
    while(cont < 4) {
      //asignar filaFin y colFin
      this.filaFin = this.obtenFila(pieza)
      this.columnFin = this.obtenerColumna(pieza)
      if(aux == 0){
        //console.log("ini0")
        while(this.filaFin + 1 <= 7) {
          if(this.tablero[this.filaFin + 1][this.columnFin] == this.v){
            //console.log("dentro0")
            this.filaFin++
          }
          else {
            //console.log("0")
            break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual0")
          aux++
          cont++
        }
        else {
          //console.log("aqui0")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 5;
          return true
        }
      }
      else if(aux == 1){
        //console.log("ini1")
        while(this.filaFin - 1 >= 0 ) {
          if(this.tablero[this.filaFin - 1][this.columnFin] == this.v){
            //console.log("dentro1")
            this.filaFin--
          }
          else {
            //console.log("1")
            break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual1")
          aux++
          cont++
        }
        else {
          //console.log("aqui1")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 5;
          return true
        }
      }
      else if(aux == 2){
        //console.log("ini2")
        while(this.columnFin + 1 <= 7) {
          if(this.tablero[this.filaFin][this.columnFin + 1] == this.v){
            //console.log("dentro2")
            this.columnFin++
          }
          else {
            //console.log("2")
            break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual2")
          aux++
          cont++
        }
        else {
          //console.log("aqui2")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 5;
          return true
        }
      }
      else if(aux == 3){
        //console.log("ini3")
        while(this.columnFin - 1 >= 0) {
          if(this.tablero[this.filaFin][this.columnFin - 1] == this.v){
            //console.log("dentro3")
            this.columnFin--
          }
          else {
            //console.log("3")
            break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual3")
          aux = 0
          cont++
        }
        else {
          //console.log("aqui3")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 5;
          return true
        }
      }
    }

  }else if(pieza == this.reinaBlanca || pieza == this.reinaNegra) {
    
    var aux = this.randomInt(0, 7);
    var cont = 0
    while(cont < 8) {
      //asignar filaFin y colFin
      this.filaFin = this.obtenFila(pieza)
      this.columnFin = this.obtenerColumna(pieza)
      if(aux == 0){
        //console.log("ini0")
        while(this.filaFin + 1 <= 7 && this.columnFin + 1 <= 7) {
          if(this.tablero[this.filaFin + 1][this.columnFin + 1] == this.v){
            //console.log("dentro0")
            this.filaFin++
            this.columnFin++
          }
          else {
            //console.log("0")
            break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual0")
          aux++
          cont++
        }
        else {
          //console.log("aqui0")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 10;
          return true
        }
      }
      else if(aux == 1){
        //console.log("ini1")
        while(this.filaFin - 1 >= 0 && this.columnFin + 1 <= 7) {
          if(this.tablero[this.filaFin - 1][this.columnFin + 1] == this.v){
            //console.log("dentro1")
            this.filaFin--
            this.columnFin++
          }
          else {
            //console.log("1")
            break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual1")
          aux++
          cont++
        }
        else {
          //console.log("aqui1")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 10;
          return true
        }
      }
      else if(aux == 2){
        //console.log("ini2")
        while(this.filaFin + 1 <= 7 && this.columnFin - 1 >= 0) {
          if(this.tablero[this.filaFin + 1][this.columnFin - 1] == this.v){
            //console.log("dentro2")
            this.filaFin++
            this.columnFin--
          }
          else {
            //console.log("2")
            break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual2")
          aux++
          cont++
        }
        else {
          //console.log("aqui2")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 10;
          return true
        }
      }
      else if(aux == 3){
        //console.log("ini3")
        while(this.filaFin - 1 >= 0 && this.columnFin - 1 >= 0) {
          if(this.tablero[this.filaFin - 1][this.columnFin - 1] == this.v){
            //console.log("dentro3")
            this.filaFin--
            this.columnFin--
          }
          else {
            //console.log("3")
            break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual3")
          aux++
          cont++
        }
        else {
          //console.log("aqui3")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 10;
          return true
        }
      }
      else if(aux == 4){
        //console.log("ini4")
        while(this.filaFin + 1 <= 7) {
          if(this.tablero[this.filaFin + 1][this.columnFin] == this.v){
            //console.log("dentro0")
            this.filaFin++
          }
          else {
            //console.log("0")
            break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual0")
          aux++
          cont++
        }
        else {
          //console.log("aqui0")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 10;
          return true
        }
      }
      else if(aux == 5){
        //console.log("ini5")
        while(this.filaFin - 1 >= 0 ) {
          if(this.tablero[this.filaFin - 1][this.columnFin] == this.v){
            //console.log("dentro1")
            this.filaFin--
          }
          else {
            //console.log("1")
            break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual1")
          aux++
          cont++
        }
        else {
          //console.log("aqui1")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 10;
          return true
        }
      }
      else if(aux == 6){
        //console.log("ini6")
        while(this.columnFin + 1 <= 7) {
          if(this.tablero[this.filaFin][this.columnFin + 1] == this.v){
            //console.log("dentro2")
            this.columnFin++
          }
          else {
            //console.log("2")
            break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual2")
          aux++
          cont++
        }
        else {
          //console.log("aqui2")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 10;
          return true
        }
      }
      else if(aux == 7){
        //console.log("ini7")
        while(this.columnFin - 1 >= 0) {
          if(this.tablero[this.filaFin][this.columnFin - 1] == this.v){
            //console.log("dentro3")
            this.columnFin--
          }
          else {
            //console.log("3")
            break
          }
        }
        if(this.filaFin == this.obtenFila(pieza) && this.columnFin == this.obtenerColumna(pieza)){
          //no se puede mover
          //console.log("igual3")
          aux = 0
          cont++
        }
        else {
          //console.log("aqui3")
          this.tablero[this.filaFin][this.columnFin] = this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)]
          this.tablero[this.obtenFila(pieza)][this.obtenerColumna(pieza)] = this.v
          this.tablero[this.filaFin][this.columnFin].fil = this.fila[this.filaFin].toString() + "%"
          this.tablero[this.filaFin][this.columnFin].col = this.columna[this.columnFin].toString() + "%"
          aux = 10;
          return true
        }
      }

    }

  }

  return false
}

////////////////////////////////////////  
/////////////////////////////////////////////////////

  //dado una pieza obtener la fila donde esta en la matriz
  obtenFila(pieza:pieza):number{
    var i:number = 0
    for (i=0; i < 9; i++){
      if(pieza.fil == this.fila[i].toString() + "%"){
        return i
      }
    }

    return -1
  }

  //dado una pieza obtener la columna donde esta en la matriz
  obtenerColumna(pieza:pieza):number{
    var i:number = 0
    for (i=0; i < 9; i++){
      if(pieza.col == this.columna[i].toString() + "%"){
        return i
      }
    }
    return -1
  }

  //devuelve si hay jaque mate a la pieza
  jaqueMate(pieza:pieza):boolean {

    var piezaAmenaza:pieza = this.jaque(pieza);
    var aux: string = this.pieza;

    //if pieza amenaza existe
    if(piezaAmenaza == this.v){return false}
    this.pieza = this.piezaToString(piezaAmenaza);

    //podemos comer peiza amenaza? si existe es falso
    if(this.jaque(piezaAmenaza) != this.v){return false}


    //movimeitnos del rey evitar jaque mate
    {
      //coger col, y fila
      var colAux:number = this.obtenerColumna(pieza);
      // var colVar
      var filAux:number = this.obtenFila(pieza);
      // var FilVar
      
      //comprobar si puedo mover 
      if(colAux+1<8 && this.tablero[colAux+1][filAux] == this.v){

        pieza.col == this.columna[colAux+1].toString() + "%"
        pieza.fil == this.fila[filAux].toString() + "%"
        if(this.jaque(pieza) == this.v) {
          pieza.col == this.columna[colAux].toString() + "%"
          pieza.fil == this.fila[filAux].toString() + "%" 
          return false;
        }
      }

      //comprobar si puedo mover 
      if(colAux-1>=0 && this.tablero[colAux-1][filAux] == this.v){

        pieza.col == this.columna[colAux-1].toString() + "%"
        pieza.fil == this.fila[filAux].toString() + "%"
        if(this.jaque(pieza) == this.v) {
          pieza.col == this.columna[colAux].toString() + "%"
          pieza.fil == this.fila[filAux].toString() + "%" 
          return false;
        }
      }

      //comprobar si puedo mover 
      if(filAux+1<8 && this.tablero[colAux][filAux+1] == this.v){

        pieza.col == this.columna[colAux].toString() + "%"
        pieza.fil == this.fila[filAux+1].toString() + "%"
        if(this.jaque(pieza) == this.v) {
          pieza.col == this.columna[colAux].toString() + "%"
          pieza.fil == this.fila[filAux].toString() + "%" 
          return false;
        }
      }

      //comprobar si puedo mover 
      if(filAux-1>=0 && this.tablero[colAux][filAux-1] == this.v){

        pieza.col == this.columna[colAux].toString() + "%"
        pieza.fil == this.fila[filAux-1].toString() + "%"
        if(this.jaque(pieza) == this.v) {
          pieza.col == this.columna[colAux].toString() + "%"
          pieza.fil == this.fila[filAux].toString() + "%" 
          return false;
        }
      }

      //comprobar si puedo mover 
      if(colAux+1<8 && filAux+1<8 && this.tablero[colAux+1][filAux+1] == this.v){

        pieza.col == this.columna[colAux+1].toString() + "%"
        pieza.fil == this.fila[filAux+1].toString() + "%"
        if(this.jaque(pieza) == this.v) {
          pieza.col == this.columna[colAux].toString() + "%"
          pieza.fil == this.fila[filAux].toString() + "%" 
          return false;
        }
      }

      //comprobar si puedo mover 
      if(colAux-1>=0 && filAux-1>=0 && this.tablero[colAux-1][filAux-1] == this.v){

        pieza.col == this.columna[colAux-1].toString() + "%"
        pieza.fil == this.fila[filAux-1].toString() + "%"
        if(this.jaque(pieza) == this.v) {
          pieza.col == this.columna[colAux].toString() + "%"
          pieza.fil == this.fila[filAux].toString() + "%" 
          return false;
        }
      }

      //comprobar si puedo mover 
      if(colAux+1<8 && filAux-1>=0 && this.tablero[colAux+1][filAux-1] == this.v){

        pieza.col == this.columna[colAux+1].toString() + "%"
        pieza.fil == this.fila[filAux-1].toString() + "%"
        if(this.jaque(pieza) == this.v) {
          pieza.col == this.columna[colAux].toString() + "%"
          pieza.fil == this.fila[filAux].toString() + "%" 
          return false;
        }
      }

      //comprobar si puedo mover 
      if(colAux-1>=0 && filAux+1<8 && this.tablero[colAux-1][filAux+1] == this.v){

        pieza.col == this.columna[colAux-1].toString() + "%"
        pieza.fil == this.fila[filAux+1].toString() + "%"
        if(this.jaque(pieza) == this.v) {
          pieza.col == this.columna[colAux].toString() + "%"
          pieza.fil == this.fila[filAux].toString() + "%" 
          return false;
        }
      }
    }

//el rey no tiene movimeientos, hay que bloquear

    if(this.peon()){
      //no se bloquea
    } 
    else if(this.alfil()) {
      var piezaAux:pieza = piezaAmenaza;
      if(this.obtenerColumna(piezaAmenaza) > this.obtenerColumna(pieza) && this.obtenFila(piezaAmenaza) > this.obtenFila(pieza)){
        piezaAux.col == this.columna[colAux - 1].toString() + "%"
        piezaAux.fil == this.fila[filAux - 1].toString() + "%" 
        while(piezaAux.col != pieza.col && piezaAux.fil != pieza.fil){
          if(this.jaque(piezaAux) != this.v) {
            return false;
          }
          piezaAux.col == this.columna[colAux - 1].toString() + "%"
          piezaAux.fil == this.fila[filAux - 1].toString() + "%" 
        }
        return true
      }
      else if(this.obtenerColumna(piezaAmenaza) > this.obtenerColumna(pieza) && this.obtenFila(piezaAmenaza) < this.obtenFila(pieza)){

      }
      else if(this.obtenerColumna(piezaAmenaza) < this.obtenerColumna(pieza) && this.obtenFila(piezaAmenaza) > this.obtenFila(pieza)){

      }
      else if(this.obtenerColumna(piezaAmenaza) < this.obtenerColumna(pieza) && this.obtenFila(piezaAmenaza) < this.obtenFila(pieza)){

      }
    }
    else if(this.caballo()){
      //no se bloquea
    }
    else if(this.torre()){
      if(this.obtenerColumna(piezaAmenaza) == this.obtenerColumna(pieza) && this.obtenerColumna(piezaAmenaza) > this.obtenerColumna(pieza)){

      }
      else if(this.obtenerColumna(piezaAmenaza) == this.obtenerColumna(pieza) && this.obtenerColumna(piezaAmenaza) < this.obtenerColumna(pieza)){

      }
      else if(this.obtenFila(piezaAmenaza) == this.obtenFila(pieza) && this.obtenFila(piezaAmenaza) > this.obtenFila(pieza)){

      }
      else if(this.obtenFila(piezaAmenaza) == this.obtenFila(pieza) && this.obtenFila(piezaAmenaza) < this.obtenFila(pieza)){

      }
    }
    else if(this.reina()){

    }

    return false;
  }

  //devuelve la pieza amenaza al parametro
  jaque(pieza:pieza):pieza {

    if(pieza.color == 1){  //la pieza es blanca, amenezan negras
      if(this.amenazaPieza(this.peonNegro0, pieza)) {
        return this.peonNegro0
      }
      else if(this.amenazaPieza(this.peonNegro1, pieza)) {
        return this.peonNegro1
      }
      else if(this.amenazaPieza(this.peonNegro2, pieza)) {
        return this.peonNegro2
      }
      else if(this.amenazaPieza(this.peonNegro3, pieza)) {
        return this.peonNegro3
      }
      else if(this.amenazaPieza(this.peonNegro4, pieza)) {
        return this.peonNegro4
      }
      else if(this.amenazaPieza(this.peonNegro5, pieza)) {
        return this.peonNegro5
      }
      else if(this.amenazaPieza(this.peonNegro6, pieza)) {
        return this.peonNegro6
      }
      else if(this.amenazaPieza(this.peonNegro7, pieza)) {
        return this.peonNegro7
      }
      else if(this.amenazaPieza(this.alfilNegro0, pieza)) {
        return this.alfilNegro0
      }
      else if(this.amenazaPieza(this.alfilNegro1, pieza)) {
        return this.alfilNegro1
      }
      else if(this.amenazaPieza(this.caballoNegro0, pieza)) {
        return this.caballoNegro0
      }
      else if(this.amenazaPieza(this.caballoNegro1, pieza)) {
        return this.caballoNegro1
      }
      else if(this.amenazaPieza(this.torreNegra0, pieza)) {
        return this.torreNegra0
      }
      else if(this.amenazaPieza(this.torreNegra1, pieza)) {
        return this.torreNegra1
      }
      else if(this.amenazaPieza(this.reinaNegra, pieza)) {
        return this.reinaNegra
      }
    }
    else if(pieza.color == -1) {      //la pieza es negra, amenazan blancas
      if(this.amenazaPieza(this.peonBlanco0, pieza)) {
        return this.peonBlanco0
      }
      else if(this.amenazaPieza(this.peonBlanco1, pieza)) {
        return this.peonBlanco1
      }
      else if(this.amenazaPieza(this.peonBlanco2, pieza)) {
        return this.peonBlanco2
      }
      else if(this.amenazaPieza(this.peonBlanco3, pieza)) {
        return this.peonBlanco3
      }
      else if(this.amenazaPieza(this.peonBlanco4, pieza)) {
        return this.peonBlanco4
      }
      else if(this.amenazaPieza(this.peonBlanco5, pieza)) {
        return this.peonBlanco5
      }
      else if(this.amenazaPieza(this.peonBlanco6, pieza)) {
        return this.peonBlanco6
      }
      else if(this.amenazaPieza(this.peonBlanco7, pieza)) {
        return this.peonBlanco7
      }
      else if(this.amenazaPieza(this.alfilBlanco0, pieza)) {
        return this.alfilBlanco0
      }
      else if(this.amenazaPieza(this.alfilBlanco1, pieza)) {
        return this.alfilBlanco1
      }
      else if(this.amenazaPieza(this.caballoBlanco0, pieza)) {
        return this.caballoBlanco0
      }
      else if(this.amenazaPieza(this.caballoBlanco1, pieza)) {
        return this.caballoBlanco1
      }
      else if(this.amenazaPieza(this.torreBlanca0, pieza)) {
        return this.torreBlanca0
      }
      else if(this.amenazaPieza(this.torreBlanca1, pieza)) {
        return this.torreBlanca1
      }
      else if(this.amenazaPieza(this.reinaBlanca, pieza)) {
        return this.reinaBlanca
      }
    }
    
    return this.v
  }


  //primer parametro pieza que amenaza, segundo parametro, pieza amenazada
  //comporbar si esta pieza(parametros) esta en amenaza, es decir, es la posicion final
  amenazaPieza(piezaIni:pieza, piezaFin:pieza):boolean{

    var i:number
    for (i=0; i < 9; i++){
      if(piezaIni.col == this.columna[i].toString() + "%"){
        break
      }
    }
    const colIni:number = i
    for (i=0; i < 9; i++){
      if(piezaIni.fil == this.fila[i].toString() + "%"){
        break
      }
    }
    const filIni:number = i

    for (i=0; i < 9; i++){
      if(piezaFin.col == this.columna[i].toString() + "%"){
        break
      }
    }
    const colFin:number = i

    for (i=0; i < 9; i++){
      if(piezaFin.fil == this.fila[i].toString() + "%"){
        break
      }
    }
    const filFin:number = i

    if(piezaIni.color != 0)
      {
        if((piezaIni == this.peonNegro0) || (piezaIni == this.peonNegro1) || (piezaIni == this.peonNegro2)
        || (piezaIni == this.peonNegro3) || (piezaIni == this.peonNegro4) || (piezaIni == this.peonNegro5)
        || (piezaIni == this.peonNegro6) || (piezaIni == this.peonNegro7)
        || (piezaIni == this.peonBlanco0) || (piezaIni == this.peonBlanco1) || (piezaIni == this.peonBlanco2) 
        || (piezaIni == this.peonBlanco3) || (piezaIni == this.peonBlanco4) || (piezaIni == this.peonBlanco5)
        || (piezaIni == this.peonBlanco6) || (piezaIni == this.peonBlanco7))
        {
          this.amenazaPeon(colIni, filIni, colFin, filFin);
        }
        else {this.amenaza(colIni, filIni, colFin, filFin);}
      }

      return this.amenazar
  }


  amenazaPeon(colIni: number, filIni: number, colFin: number, filFin: number):boolean {
    if(this.blanco == 1 && this.tablero[filIni][colIni].color == -1) { // tablero blanco con peon blanco
      this.amenazar = ((filIni - filFin == -1) && ((colIni + 1 == colFin) || (colIni - 1 == colFin)))
      } 
    else if(this.blanco == 1 && this.tablero[filIni][colIni].color == 1) { // tablero blanco con peon blanco
      //console.log("aqui amigo")
      this.amenazar = ((filIni - filFin == 1) && ((colIni + 1 == colFin) || (colIni - 1 == colFin)))
      } 
    else if(this.negro == 1 && this.tablero[filIni][colIni].color == -1) { // tablero blanco con peon blanco
      this.amenazar = ((filIni - filFin == 1) && ((colIni + 1 == colFin) || (colIni - 1 == colFin)))
    } 
    else if(this.negro == 1 && this.tablero[filIni][colFin].color == 1){ // tablero blanco con peon blanco
      this.amenazar = ((filIni - filFin == -1) && ((colIni + 1 == colFin) || (colIni - 1 == colFin)))
    } 
    return this.amenazar 
  }
  //parametros son la posicion inicial        posicion final
  amenaza(colIni:number, filIni:number, colFin:number, filFin:number):boolean{
    const filIniAux:number = this.filaIni
    const colIniAux:number =  this.columnIni

    const filFinAux:number = this.filaFin
    const colFinAux:number = this.columnFin

    //console.log(colFin)
    //console.log(filFin)
    //amenaza
    this.filaIni = filIni
    this.columnIni = colIni

    //amenazada
    this.filaFin = filFin
    this.columnFin = colFin
    const name:string = this.pieza

    this.pieza = this.piezaToString(this.tablero[filIni][colIni]);

    this.comprobarJugada()
    this.libre()
    //console.log("aqui")

    //amenaza
    this.filaIni = filIniAux
    this.columnIni = colIniAux


    //amenazada
    this.filaFin = filFinAux
    this.columnFin = colFinAux

    this.pieza = name

    this.amenazar = this.puedeMover;
    const sol = this.puedeMover
    this.puedeMover = false
    return sol

  }

  piezaToString(pieza:pieza):string{
    if((pieza == this.peonNegro0) || (pieza == this.peonNegro1) || (pieza == this.peonNegro2)
    || (pieza == this.peonNegro3) || (pieza == this.peonNegro4) || (pieza == this.peonNegro5)
    || (pieza == this.peonNegro6) || (pieza == this.peonNegro7)
    || (pieza == this.peonBlanco0) || (pieza == this.peonBlanco1) || (pieza == this.peonBlanco2) 
    || (pieza == this.peonBlanco3) || (pieza == this.peonBlanco4) || (pieza == this.peonBlanco5)
    || (pieza == this.peonBlanco6) || (pieza == this.peonBlanco7)){
      if(pieza.color == 1) {return "peonBlanco0"}
      else {return "peonNegro0"}
    }
    
    if((pieza == this.alfilBlanco0) || (pieza == this.alfilBlanco1) || (pieza == this.alfilNegro0)
    || (pieza == this.alfilNegro1)) {return "alfilNegro0"}
    
    if((pieza == this.caballoBlanco0) || (pieza == this.caballoBlanco1) || (pieza == this.caballoNegro0)
    || (pieza == this.caballoNegro1)){return "caballoNegro0"}
    
    if((pieza == this.torreBlanca0) || (pieza == this.torreBlanca1) || (pieza == this.torreNegra0)
    || (pieza == this.torreNegra1)) {return "torreNegra0"}
    
    if(pieza == this.reinaBlanca || pieza == this.reinaNegra) {return "reinaNegra"}
    
    if(pieza == this.reyBlanco || pieza == this.reyNegro) {return "reyNegro"}
    
    return ""
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
    if(JuegoComponent.online && !this.miTurno) {return} //no es tu turno
    if(JuegoComponent.finTiempo || this.ganar) {return;} //se acabo el tiempo

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
        this.peonNegro0.img = JuegoComponent.peonNegro
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "peonNegro1") {
        this.peonNegro1.img = JuegoComponent.peonNegro
        this.seleccionada = !this.seleccionada;
      }  
      else if(p == "peonNegro2") {
        this.peonNegro2.img = JuegoComponent.peonNegro
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "peonNegro3") {
        this.peonNegro3.img = JuegoComponent.peonNegro
        this.seleccionada = !this.seleccionada;
      } 
      else if(p == "peonNegro4") {
        this.peonNegro4.img = JuegoComponent.peonNegro
        this.seleccionada = !this.seleccionada;
      } 
      else if(p == "peonNegro5") {
        this.peonNegro5.img = JuegoComponent.peonNegro
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "peonNegro6") {
        this.peonNegro6.img = JuegoComponent.peonNegro
        this.seleccionada = !this.seleccionada;
      }  
      else if(p == "peonNegro7") {
        this.peonNegro7.img = JuegoComponent.peonNegro
        this.seleccionada = !this.seleccionada;
      }

      else if(p == "peonBlanco0") {
        this.peonBlanco0.img = JuegoComponent.peonBlanco
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "peonBlanco1") {
        this.peonBlanco1.img = JuegoComponent.peonBlanco
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "peonBlanco2") {
        this.peonBlanco2.img = JuegoComponent.peonBlanco
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "peonBlanco3") {
        this.peonBlanco3.img = JuegoComponent.peonBlanco
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "peonBlanco4") {
        this.peonBlanco4.img = JuegoComponent.peonBlanco
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "peonBlanco5") {
        this.peonBlanco5.img = JuegoComponent.peonBlanco
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "peonBlanco6") {
        this.peonBlanco6.img = JuegoComponent.peonBlanco
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "peonBlanco7") {
        this.peonBlanco7.img = JuegoComponent.peonBlanco
        this.seleccionada = !this.seleccionada;
      }
      //alfil     
      else if(p == "alfilNegro0") {
        this.alfilNegro0.img = JuegoComponent.alfilNegro
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "alfilNegro1") {
        this.alfilNegro1.img = JuegoComponent.alfilNegro
        this.seleccionada = !this.seleccionada;
      }

      else if(p == "alfilBlanco0") {
        this.alfilBlanco0.img = JuegoComponent.alfilBlanco
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "alfilBlanco1") {
        this.alfilBlanco1.img = JuegoComponent.alfilBlanco
        this.seleccionada = !this.seleccionada;
      }
      //caballos  
      else if(p == "caballoNegro0") {
        this.caballoNegro0.img = JuegoComponent.caballoNegro
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "caballoNegro1") {
        this.caballoNegro1.img = JuegoComponent.caballoNegro
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "caballoBlanco0") {
        this.caballoBlanco0.img = JuegoComponent.caballoBlanco
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "caballoBlanco1") {
        this.caballoBlanco1.img = JuegoComponent.caballoBlanco
        this.seleccionada = !this.seleccionada;
      }
      //torres
      else if(p == "torreNegra0") {
        this.torreNegra0.img = JuegoComponent.torreNegra
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "torreNegra1") {
        this.torreNegra1.img = JuegoComponent.torreNegra
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "torreBlanca0") {
        this.torreBlanca0.img = JuegoComponent.torreBlanca
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "torreBlanca1") {
        this.torreBlanca1.img = JuegoComponent.torreBlanca
        this.seleccionada = !this.seleccionada;
      }
      //reina  
      else if(p == "reinaNegra") {
        this.reinaNegra.img = JuegoComponent.reinaNegra
        this.seleccionada = !this.seleccionada;
      }
      else if(p == "reinaBlanca") {
        this.reinaBlanca.img = JuegoComponent.reinaBlanca
        this.seleccionada = !this.seleccionada;
      }
      //rey 
      else if(p == "reyNegro") {
        this.reyNegro.img = JuegoComponent.reyNegro
        this.seleccionada = !this.seleccionada;
      } 
      else if(p == "reyBlanco") {
        this.reyBlanco.img = JuegoComponent.reyBlanco
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


  comprobarJugada(){
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
        this.reinaBlanca0.img = JuegoComponent.reinaBlanca;
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
    if(JuegoComponent.finTiempo) {return;} //se acabo el tiempo
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    if(this.seleccionada) {
      
      this.casilla(event)
      if(this.tablero[this.filaFin][this.columnFin] == this.v) {
        this.comprobarJugada()
        this.libre()

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
              this.reyBlanco.img  = JuegoComponent.reyBlanco
              
              this.tablero[this.filaIni][3] = this.torreBlanca0
              this.torreBlanca0.col = this.columna[3] + "%"

              this.seleccionada = !this.seleccionada
              this.puedeMover = false;
              this.turno = !this.turno

              this.enroqueBlanco0 = false
              this.enroqueBlanco1 = false
              
              if(JuegoComponent.ia)
              {this.IA()}

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
              this.reyBlanco.img  = JuegoComponent.reyBlanco

              this.tablero[this.filaIni][5] = this.torreBlanca1
              this.torreBlanca1.col = this.columna[5] + "%"

              this.seleccionada = !this.seleccionada
              this.puedeMover = false;
              this.turno = !this.turno
              
              this.enroqueBlanco0 = false
              this.enroqueBlanco1 = false

              if(JuegoComponent.ia)
              {this.IA()}

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
              this.reyBlanco.img  = JuegoComponent.reyBlanco

              this.tablero[this.filaIni][4] = this.torreBlanca0
              this.torreBlanca0.col = this.columna[4] + "%"

              this.seleccionada = !this.seleccionada
              this.puedeMover = false;
              this.turno = !this.turno

              this.enroqueBlanco0 = false
              this.enroqueBlanco1 = false

              if(JuegoComponent.ia)
              {this.IA()}

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
              this.reyBlanco.img  = JuegoComponent.reyBlanco

              this.tablero[this.filaIni][2] = this.torreBlanca1
              this.torreBlanca1.col = this.columna[2] + "%"

              this.seleccionada = !this.seleccionada
              this.puedeMover = false;
              this.turno = !this.turno

              this.enroqueBlanco0 = false
              this.enroqueBlanco1 = false

              if(JuegoComponent.ia)
              {this.IA()}

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
              this.reyNegro.img  = JuegoComponent.reyNegro

              this.tablero[this.filaIni][5] = this.torreNegra0
              this.torreNegra0.col = this.columna[5] + "%"

              this.seleccionada = !this.seleccionada
              this.puedeMover = false;
              this.turno = !this.turno

              this.enroqueNegro0 = false
              this.enroqueNegro1 = false

              if(JuegoComponent.ia)
              {this.IA()}

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
              this.reyNegro.img  = JuegoComponent.reyNegro

              this.tablero[this.filaIni][3] = this.torreNegra1
              this.torreNegra1.col = this.columna[3] + "%"

              this.seleccionada = !this.seleccionada
              this.puedeMover = false;
              this.turno = !this.turno

              this.enroqueNegro0 = false
              this.enroqueNegro1 = false

              if(JuegoComponent.ia)
              {this.IA()}

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
              this.reyNegro.img  = JuegoComponent.reyNegro

              this.tablero[this.filaIni][2] = this.torreNegra0
              this.torreNegra0.col = this.columna[2] + "%"

              this.seleccionada = !this.seleccionada
              this.puedeMover = false;
              this.turno = !this.turno

              this.enroqueNegro0 = false
              this.enroqueNegro1 = false

              if(JuegoComponent.ia)
              {this.IA()}

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
              this.reyNegro.img  = JuegoComponent.reyNegro

              this.tablero[this.filaIni][4] = this.torreNegra1
              this.torreNegra1.col = this.columna[4] + "%"

              this.seleccionada = !this.seleccionada
              this.puedeMover = false;
              this.turno = !this.turno

              this.enroqueNegro0 = false
              this.enroqueNegro1 = false

              if(JuegoComponent.ia)
              {this.IA()}

            }
        }

      }

      else if(this.tablero[this.filaIni][this.columnIni].color == (this.tablero[this.filaFin][this.columnFin].color * -1)){
        //comer
        this.comprobarJugada()
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
          this.peonNegro0.img  = JuegoComponent.peonNegro    
          this.peonNegro0.fil = this.auxY.toString() + "%"
          this.peonNegro0.col =  this.auxX.toString() + "%" 
        }
  
        if(this.pieza == "peonNegro1") {
          this.peonNegro1.img  = JuegoComponent.peonNegro   
          this.peonNegro1.fil = this.auxY.toString() + "%"
          this.peonNegro1.col =  this.auxX.toString() + "%" 
        }
  
        if(this.pieza == "peonNegro2") {  
          this.peonNegro2.img  = JuegoComponent.peonNegro
          this.peonNegro2.fil = this.auxY.toString() + "%"
          this.peonNegro2.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonNegro3") {  
          this.peonNegro3.img  = JuegoComponent.peonNegro
          this.peonNegro3.fil = this.auxY.toString() + "%"
          this.peonNegro3.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonNegro4") {  
          this.peonNegro4.img  = JuegoComponent.peonNegro
          this.peonNegro4.fil = this.auxY.toString() + "%"
          this.peonNegro4.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonNegro5") {  
          this.peonNegro5.img  = JuegoComponent.peonNegro
          this.peonNegro5.fil = this.auxY.toString() + "%"
          this.peonNegro5.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonNegro6") {  
          this.peonNegro6.img  = JuegoComponent.peonNegro
          this.peonNegro6.fil = this.auxY.toString() + "%"
          this.peonNegro6.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonNegro7") {  
          this.peonNegro7.img  = JuegoComponent.peonNegro
          this.peonNegro7.fil = this.auxY.toString() + "%"
          this.peonNegro7.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonBlanco0") {  
          this.peonBlanco0.img  = JuegoComponent.peonBlanco
          this.peonBlanco0.fil = this.auxY.toString() + "%"
          this.peonBlanco0.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonBlanco1") {  
          this.peonBlanco1.img  = JuegoComponent.peonBlanco
          this.peonBlanco1.fil = this.auxY.toString() + "%"
          this.peonBlanco1.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonBlanco2") {  
          this.peonBlanco2.img  = JuegoComponent.peonBlanco
          this.peonBlanco2.fil = this.auxY.toString() + "%"
          this.peonBlanco2.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonBlanco3") {  
          this.peonBlanco3.img  = JuegoComponent.peonBlanco
          this.peonBlanco3.fil = this.auxY.toString() + "%"
          this.peonBlanco3.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonBlanco4") {  
          this.peonBlanco4.img  = JuegoComponent.peonBlanco
          this.peonBlanco4.fil = this.auxY.toString() + "%"
          this.peonBlanco4.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonBlanco5") {  
          this.peonBlanco5.img  = JuegoComponent.peonBlanco
          this.peonBlanco5.fil = this.auxY.toString() + "%"
          this.peonBlanco5.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonBlanco6") {  
          this.peonBlanco6.img  = JuegoComponent.peonBlanco
          this.peonBlanco6.fil = this.auxY.toString() + "%"
          this.peonBlanco6.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "peonBlanco7") {  
          this.peonBlanco7.img  = JuegoComponent.peonBlanco
          this.peonBlanco7.fil = this.auxY.toString() + "%"
          this.peonBlanco7.col =  this.auxX.toString() + "%" 
        }
        //alfiles
        if(this.pieza == "alfilNegro0") {
          this.alfilNegro0.img  = JuegoComponent.alfilNegro
          this.alfilNegro0.fil = this.auxY.toString() + "%"
          this.alfilNegro0.col =  this.auxX.toString() + "%" 
        }
        if(this.pieza == "alfilNegro1") {
          this.alfilNegro1.img  = JuegoComponent.alfilNegro
          this.alfilNegro1.fil = this.auxY.toString() + "%"
          this.alfilNegro1.col =  this.auxX.toString() + "%" 
        }

        if(this.pieza == "alfilBlanco0") {
          this.alfilBlanco0.img  = JuegoComponent.alfilBlanco
          this.alfilBlanco0.fil = this.auxY.toString() + "%"
          this.alfilBlanco0.col =  this.auxX.toString() + "%" 
        }
        if(this.pieza == "alfilBlanco1") {
          this.alfilBlanco1.img  = JuegoComponent.alfilBlanco
          this.alfilBlanco1.fil = this.auxY.toString() + "%"
          this.alfilBlanco1.col =  this.auxX.toString() + "%" 
        }
        //caballos
        if(this.pieza == "caballoNegro0") {
          this.caballoNegro0.img  = JuegoComponent.caballoNegro
          this.caballoNegro0.fil = this.auxY.toString() + "%"
          this.caballoNegro0.col =  this.auxX.toString() + "%" 
        } 
        if(this.pieza == "caballoNegro1") {
          this.caballoNegro1.img  = JuegoComponent.caballoNegro
          this.caballoNegro1.fil = this.auxY.toString() + "%"
          this.caballoNegro1.col =  this.auxX.toString() + "%" 
        } 
        if(this.pieza == "caballoBlanco0") {
          this.caballoBlanco0.img  = JuegoComponent.caballoBlanco
          this.caballoBlanco0.fil = this.auxY.toString() + "%"
          this.caballoBlanco0.col =  this.auxX.toString() + "%" 
        } 
        if(this.pieza == "caballoBlanco1") {
          this.caballoBlanco1.img  = JuegoComponent.caballoBlanco
          this.caballoBlanco1.fil = this.auxY.toString() + "%"
          this.caballoBlanco1.col =  this.auxX.toString() + "%" 
        } 
        //torres
        if(this.pieza == "torreNegra0") {
          this.torreNegra0.img  = JuegoComponent.torreNegra
          this.torreNegra0.fil = this.auxY.toString() + "%"
          this.torreNegra0.col =  this.auxX.toString() + "%" 
          this.enroqueNegro0 = false
        }
        if(this.pieza == "torreNegra1") {
          this.torreNegra1.img  = JuegoComponent.torreNegra
          this.torreNegra1.fil = this.auxY.toString() + "%"
          this.torreNegra1.col =  this.auxX.toString() + "%" 
          this.enroqueNegro1 = false
        }
        if(this.pieza == "torreBlanca0") {
          this.torreBlanca0.img  = JuegoComponent.torreBlanca
          this.torreBlanca0.fil = this.auxY.toString() + "%"
          this.torreBlanca0.col =  this.auxX.toString() + "%" 
          this.enroqueBlanco0 = false
        }
        if(this.pieza == "torreBlanca1") {
          this.torreBlanca1.img  = JuegoComponent.torreBlanca
          this.torreBlanca1.fil = this.auxY.toString() + "%"
          this.torreBlanca1.col =  this.auxX.toString() + "%" 
          this.enroqueBlanco1 = false
        }
        //reina
        if(this.pieza == "reinaNegra") {
          this.reinaNegra.img  = JuegoComponent.reinaNegra
          this.reinaNegra.fil = this.auxY.toString() + "%"
          this.reinaNegra.col =  this.auxX.toString() + "%" 
        }
        if(this.pieza == "reinaBlanca") {
          this.reinaBlanca.img  = JuegoComponent.reinaBlanca
          this.reinaBlanca.fil = this.auxY.toString() + "%"
          this.reinaBlanca.col =  this.auxX.toString() + "%" 
        }

        //rey
        if(this.pieza == "reyNegro") {
          this.reyNegro.img  = JuegoComponent.reyNegro
          this.reyNegro.fil = this.auxY.toString() + "%"
          this.reyNegro.col =  this.auxX.toString() + "%" 
          this.enroqueNegro1 = false
          this.enroqueNegro0 = false
        }
        if(this.pieza == "reyBlanco") {
          this.reyBlanco.img  = JuegoComponent.reyBlanco
          this.reyBlanco.fil = this.auxY.toString() + "%"
          this.reyBlanco.col =  this.auxX.toString() + "%" 
          this.enroqueBlanco1 = false
          this.enroqueBlanco0 = false
        }
        
        //fin de la partida?
        // if(online) -> enviar movimiento, esperar al suyo, miturno=false 
        if(JuegoComponent.online){
          this.socketService.sendGameMove(this.opponent, this.filaIni, this.columnIni, this.filaFin, this.columnFin);
          this.miTurno = false;
        }

        //if he ganado

        //this.coronar()
        this.seleccionada = !this.seleccionada
        this.puedeMover = false;
        this.cambiarTimer();
        this.turno = !this.turno
        //console.log(this.jaque(this.reyBlanco))
        if(JuegoComponent.ia)
          this.IA()

        //if(online)->esperar turno, my turno= true, cambair timer, comporbar fin partida
        //getGameMove { op: "", fI: 1, cI: 2, fF: 3, cF: 4 }
        if(JuegoComponent.online){
          this.socketService.getGameMove().subscribe((data: any) => {
            this.filaIni = data.fI
            this.columnIni = data.cI
            this.filaFin = data.fF
            this.columnFin = data.cF
          //mover pieza
          this.moverRival()

          this.miTurno = true;
          {this.seleccionada = !this.seleccionada
          this.puedeMover = false;
          this.cambiarTimer();
          this.turno = !this.turno}
          })
        }
      }
    }
  }
}

