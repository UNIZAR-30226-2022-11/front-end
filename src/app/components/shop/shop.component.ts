import { Component, OnInit } from '@angular/core';
import { articulo, tablePath, piecesPath, avatarPath } from 'src/app/other/interfaces';
import { ServiceClientService } from 'src/app/services/service-client.service';
import { UserServiceService } from 'src/app/services/user-service.service';
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
    {   nombre: "BoardMarron",
        precio: 0,
        tipo: "table"},
    {   nombre: "BoardGris",
        precio: 5,
        tipo: "table"},
    {   nombre: "BoardAzul",
        precio: 10,
        tipo: "table"},
    {   nombre: "BoardRojoAzul",
        precio: 15,
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
    {   nombre: "star_avatar",
        precio: 0,
        tipo: "avatar"},
    {   nombre: "heart",
        precio: 120,
        tipo: "table"},
    {   nombre: "soccer",
        precio: 120,
        tipo: "table"},
    {   nombre: "knight",
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
    return UserServiceService.user.monedas
  }

  constructor(private servicioCliente:ServiceClientService) { }

  ngOnInit(): void {
    if (UserServiceService.logged) {
      this.getShop();
    }

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

  buy(nombre: string, tipo:string){
    console.log(nombre, tipo);
    this.servicioCliente.BuyItem(UserServiceService.user.nickname, nombre,tipo).subscribe(datos=>{
      if (datos.exito == true){
        this.getShop();
        this.servicioCliente.GetCoins(UserServiceService.user.nickname).subscribe(datos=>{
          UserServiceService.user.monedas = datos.coins.coins;
        })
      }
    })
  }

  getShop(){
    this.servicioCliente.GetShop(UserServiceService.user.nickname).subscribe(datos=>{
      this.tablesList = [];
      this.piecesList = [];
      this.avatarsList = [];
      for(let i=0;i<datos.articulos.length;i++){
        console.log(datos)
        var articulo:articulo= {
          nombre: datos.articulos[i].nombre,
          precio:datos.articulos[i].precio,
          tipo:datos.articulos[i].tipo
        }
        console.log(articulo)
        if (datos.articulos[i].tipo == "table"){
          this.tablesList.push(articulo);
        }else if (datos.articulos[i].tipo == "pieces"){
          this.piecesList.push(articulo);
        }else if (datos.articulos[i].tipo == "avatar"){
          this.avatarsList.push(articulo);
        }
      }
    })
  }
}
