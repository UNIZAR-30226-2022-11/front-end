import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { articulo, tablePath, piecesPath } from 'src/app/other/interfaces';
import { reduce } from 'rxjs';

@Component({
  selector: 'app-inventary',
  templateUrl: './inventary.component.html',
  styleUrls: ['./inventary.component.css']
})
export class InventaryComponent implements OnInit {


  tablePath = tablePath;
  piecesPath = piecesPath;
  showTables : boolean = true;

  tablesList: Array<articulo>=[
    {   nombre: "standart_table",
        precio: 0,
        tipo: "table"}
    ];
  piecesList: Array<articulo>=[
    {   nombre: "standart_piece",
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


  buyTable(event:MouseEvent){
    
  }

  buyPieces(event:MouseEvent){

  }

}
