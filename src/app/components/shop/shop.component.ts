import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { articulo, tablePath, piecesPath, avatarPath } from 'src/app/other/interfaces';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  tablePath = tablePath;
  piecesPath = piecesPath;
  avatarPath = avatarPath;
  showTables : boolean = true;
  showPieces: boolean = false;
  showAvatars: boolean = false;
  tablesList: Array<articulo>=[
    {   nombre: "standart_table",
        precio: 0,
        tipo: "table"},
    {   nombre: "standart_table",
        precio: 120,
        tipo: "table"},
    {   nombre: "standart_table",
        precio: 25,
        tipo: "table"}
    ];
  piecesList: Array<articulo>=[
    {   nombre: "standart_table",
        precio: 0,
        tipo: "table"},
    {   nombre: "standart_table",
        precio: 120,
        tipo: "table"},
    {   nombre: "standart_table",
        precio: 25,
        tipo: "table"}
    ];
  avatarsList: Array<articulo> = [
    {   nombre: "star",
        precio: 0,
        tipo: "table"},
    {   nombre: "heart",
        precio: 120,
        tipo: "table"},
    ];

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
      this.showPieces = false;
      this.showAvatars = false;
    }else if (obj.id == "piecesSelector"){
      this.showTables = false;
      this.showPieces = true;
      this.showAvatars = false;
    }else{
      this.showTables = false;
      this.showPieces = false;
      this.showAvatars = true;
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
    }
    else if (this.showPieces){
      var element=document.getElementById("piecesSelector")
      element?.classList.add('shopping')
    }else{
      var element=document.getElementById("avatarsSelector")
      element?.classList.add('shopping')
    }
  }

  buyTable(event:MouseEvent){
    
  }

  buyPieces(event:MouseEvent){

  }

  buyAvatar(event:MouseEvent){

  }

}
