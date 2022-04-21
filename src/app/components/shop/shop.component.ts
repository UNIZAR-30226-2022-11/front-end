import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { articulo } from 'src/app/other/interfaces';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  showTables : boolean = true;
  tablesList: Array<articulo>=[];
  piecesList: Array<articulo>=[];

  modifyButtonsClasses (event:MouseEvent){
    var obj : any = event.target;
    //Quitamos la clase selector de todos los selectores
    var class_name="shopping";
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
      element?.classList.add('shopping')
  }

  get userCoins() {
    return LoginComponent.user.monedas
  }

  constructor() { }

  ngOnInit(): void {
    if (this.showTables){
      var element=document.getElementById("tablesSelector")
      element?.classList.add('shopping')
    }else{
      var element=document.getElementById("piecesSelector")
      element?.classList.add('shopping')
    }
  }

}
