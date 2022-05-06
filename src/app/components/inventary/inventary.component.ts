import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { articulo, tablePath, piecesPath } from 'src/app/other/interfaces';
import { reduce } from 'rxjs';
import { JuegoComponent } from '../juego/juego.component';

@Component({
  selector: 'app-inventary',
  templateUrl: './inventary.component.html',
  styleUrls: ['./inventary.component.css']
})
export class InventaryComponent implements OnInit {


  tablePath = tablePath;
  piecesPath = piecesPath;
  showTables : boolean = true;
  selectedTable: string = "standart_table";
  selectedPieza: string = "default_Piezas";

  tablesList: Array<articulo>=[
    {   nombre: "standart_table",
        precio: 0,
        tipo: "table"}
    ];
  piecesList: Array<articulo>=[
    {   nombre: "default_Piezas",
        precio: 0,
        tipo: "piece"}, 

    {   nombre: "rojiAzul_Piezas",
        precio: 0,
        tipo: "piece"}
    ];

    ngOnInit(): void {
      if (this.showTables){
        var element=document.getElementById("tablesSelector")
        element?.classList.add('shopping')
      }else{
        var element=document.getElementById("piecesSelector")
        element?.classList.add('shopping')
      }
    }

  get userCoins() {
    return LoginComponent.user.monedas
  }

  modifyButtonsClasses (event:MouseEvent){
    var obj : any = event.target;
    //Quitamos la clase selector de todos los selectores
    var class_name="inventary";
    const collection = document.getElementsByClassName(class_name);
    for (let i = 0; i < collection.length; i++) {
      collection[i].classList.remove(class_name);
    } 
    //Le damos la clase selector al boton clickado
    if (obj.id == "tablesSelector"){
      this.showTables = true;
      
    }else{
      this.showTables = false;
    }
    var element=document.getElementById(obj.id)
      element?.classList.add('inventary')
  }


  selectTable(event:MouseEvent){
    
  }

  selectPieces(pieza:string){
    
    if(pieza == "default_Piezas"){
      console.log("default")
       JuegoComponent.peonBlanco = "./assets/ajedrez/peon_blanco.png"
       JuegoComponent.alfilBlanco = "./assets/ajedrez/alfil_blanco.png"
       JuegoComponent.caballoBlanco = "./assets/ajedrez/caballo_blanco.png"
       JuegoComponent.torreBlanca = "./assets/ajedrez/torre_blanca.png"
       JuegoComponent.reinaBlanca = "./assets/ajedrez/reina_blanca.png"
       JuegoComponent.reyBlanco = "./assets/ajedrez/rey_blanco.png"
    
       JuegoComponent.peonNegro = "./assets/ajedrez/peon_negro.png"
       JuegoComponent.alfilNegro = "./assets/ajedrez/alfil_negro.png"
       JuegoComponent.caballoNegro = "./assets/ajedrez/caballo_negro.png"
       JuegoComponent.torreNegra = "./assets/ajedrez/torre_negra.png"
       JuegoComponent.reinaNegra = "./assets/ajedrez/reina_negra.png"
       JuegoComponent.reyNegro = "./assets/ajedrez/rey_negro.png"

    }

    else if(pieza == "rojiAzul_Piezas"){
      console.log("red")

      JuegoComponent.peonBlanco = "./assets/ajedrez/peon_rojo.png"
      JuegoComponent.alfilBlanco = "./assets/ajedrez/alfil_rojo.png"
      JuegoComponent.caballoBlanco = "./assets/ajedrez/caballo_rojo.png"
      JuegoComponent.torreBlanca = "./assets/ajedrez/torre_roja.png"
      JuegoComponent.reinaBlanca = "./assets/ajedrez/reina_roja.png"
      JuegoComponent.reyBlanco = "./assets/ajedrez/rey_rojo.png"
   
      JuegoComponent.peonNegro = "./assets/ajedrez/peon_blue.png"
      JuegoComponent.alfilNegro = "./assets/ajedrez/alfil_blue.png"
      JuegoComponent.caballoNegro = "./assets/ajedrez/caballo_blue.png"
      JuegoComponent.torreNegra = "./assets/ajedrez/torre_blue.png"
      JuegoComponent.reinaNegra = "./assets/ajedrez/reina_blue.png"
      JuegoComponent.reyNegro = "./assets/ajedrez/rey_blue.png"

    }
  }

}
