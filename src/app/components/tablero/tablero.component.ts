import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { initialGame, piecesImages, piecesInfo } from 'src/app/other/interfaces';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  whiteTurn: boolean = true;


  constructor() { 
  }

  
  ngOnInit(): void {
    var textBoxes = document.querySelectorAll('[id]')
    var placeToWrite;
    for(var i in textBoxes) {

      /*Cargamos las imagenes en sus casillas*/
      placeToWrite = <string>textBoxes[i].id;
      var image:string ;
      if (initialGame[placeToWrite] in piecesInfo){
        image = piecesInfo[initialGame[placeToWrite]].img
        var el = (document.getElementById(placeToWrite) as HTMLImageElement);
        el?.addEventListener("click", this.reply_click, false);
      }else{
        image = "./assets/ajedrez/Empty.png";
      }
      (document.getElementById(placeToWrite) as HTMLImageElement)!.src
        = image;
      (document.getElementById(placeToWrite) as HTMLImageElement)!.name
        = initialGame[placeToWrite];
      //Opcion A: piezas con caracteres
      /*document.getElementById(placeToWrite)!.textContent 
        = piecesInfo[initialGame[placeToWrite]].text;*/
      /*document.getElementById(placeToWrite)!.textContent 
        = piecesImages[initialGame[placeToWrite]];*/
      /*(document.getElementById(placeToWrite) as HTMLImageElement).src 
        = piecesInfo[initialGame[placeToWrite]].img;*/
      //Opcion B: piezas con imagenes (no funciona por la ruta)
      /*(document.getElementById(placeToWrite) as HTMLImageElement).src 
        = "/src/assets/ajedrez/alfil_azul.png" ;*/
    }
  }

  
  determineValidBoxes(piece : string){

  }


  reply_click(event: MouseEvent){
    var obj : any = event.target;
    alert(this.whiteTurn);
    //this.determineValidBoxes(obj.name )
    alert("antes")
    this.removeListeners('funcionajoder', event);
    alert("despues")
    if (this.whiteTurn == piecesInfo[obj.name].white){
      alert("can play");
      this.whiteTurn = !this.whiteTurn;
    }
  }

  private removeListeners(p:string, event:MouseEvent){
    alert("quitando listeners")
    var textBoxes = document.querySelectorAll('[id]')
    var placeToWrite;
    for(var i in textBoxes) {
      placeToWrite = <string>textBoxes[i].id;
      var el = (document.getElementById(placeToWrite) as HTMLImageElement);
      el.removeEventListener("click", this.reply_click);
    }
  }


  /*info(p:string)

  seleccionar(event: MouseEvent){

  }
*/
}
