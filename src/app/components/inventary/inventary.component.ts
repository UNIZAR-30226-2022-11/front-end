import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { articulo, tablePath, piecesPath, avatarPath } from 'src/app/other/interfaces';
import { reduce } from 'rxjs';
import { JuegoComponent } from '../juego/juego.component';
import { ServiceClientService } from 'src/app/services/service-client.service';

@Component({
  selector: 'app-inventary',
  templateUrl: './inventary.component.html',
  styleUrls: ['./inventary.component.css']
})
export class InventaryComponent implements OnInit {


  tablePath = tablePath;
  piecesPath = piecesPath;
  avatarPath = avatarPath;
  showTables : boolean = true;
  showPieces: boolean = false;
  showAvatars: boolean = false;
  static selectedTable: string = "BoardGris";
  static selectedPieza: string = "default_Piezas";
  static selectedAvatar: string = "knight_avatar";
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
    {   nombre: "default_Piezas",
        precio: 0,
        tipo: "piece"}, 

    {   nombre: "rojiAzul_Piezas",
        precio: 0,
        tipo: "piece"}
    ];
  avatarsList: Array<articulo> =  [
    {   nombre: "star_avatar",
        precio: 0,
        tipo: "avatar"},
    {   nombre: "heart_avatar",
        precio: 120,
        tipo: "table"},
    {   nombre: "soccer_avatar",
        precio: 120,
        tipo: "table"},
    {   nombre: "knight_avatar",
        precio: 120,
        tipo: "table"},
    ];

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
      if (UserServiceService.logged) {
        this.getInventary();
      }
    }

  get userCoins() {
    return UserServiceService.user.monedas
  }

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

  get selectedTable(){
    return InventaryComponent.selectedTable;
  }

  selectTable(table:string){
    this.servicioCliente.UpdateTable(UserServiceService.user.nickname, table).subscribe(datos=>{
      if (datos.exito == true){
        InventaryComponent.selectedTable = table;
        UserServiceService.user.tablero = table;
        JuegoComponent.tableroImg = tablePath[table];
      }
    })
  }

  get selectedPieza(){
    return InventaryComponent.selectedPieza;
  }

  selectPieces(pieza:string){
    this.servicioCliente.UpdatePieces(UserServiceService.user.nickname, pieza).subscribe(datos=>{
      if (datos.exito == true){
        InventaryComponent.selectedPieza = pieza;
        UserServiceService.user.piezas = pieza;
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
    }) 
  }

  get selectedAvatar(){
    return InventaryComponent.selectedAvatar;
  }

  selectAvatar(avatar:string){
    this.servicioCliente.UpdateAvatar(UserServiceService.user.nickname, avatar).subscribe(datos=>{
      if (datos.exito == true){
        InventaryComponent.selectedAvatar = avatar;
        UserServiceService.user.avatar = avatar;
        JuegoComponent.avatarImg = avatarPath[avatar];
      }
    })
  }

  constructor(private servicioCliente:ServiceClientService) { }

  getInventary(){
    this.servicioCliente.GetInventary(UserServiceService.user.nickname).subscribe(datos=>{
      this.tablesList = [];
      this.piecesList = [];
      this.avatarsList = [];
      for(let i=0;i<datos.articulos.length;i++){
        var articulo:articulo= {
          nombre: datos.articulos[i].ARTICULO_nombre,
          precio: 0,
          tipo:datos.articulos[i].tipo
        }
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
