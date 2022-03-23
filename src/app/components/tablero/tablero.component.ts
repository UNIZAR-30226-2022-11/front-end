import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { initialGame, piecesImages } from 'src/app/other/interfaces';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  constructor() { }

  whiteTurn: boolean = true
  ngOnInit(): void {
    var textBoxes = document.querySelectorAll('[id]')
    var placeToWrite;
    for(var i in textBoxes) {
      placeToWrite = <string>textBoxes[i].id;
      //Opcion A: piezas con caracteres
      document.getElementById(placeToWrite)!.textContent 
        = piecesImages[initialGame[placeToWrite]];
      //Opcion B: piezas con imagenes (no funciona por la ruta)
      /*(document.getElementById(placeToWrite) as HTMLImageElement).src 
        = "/src/assets/ajedrez/alfil_azul.png" ;*/
    }
  }

  reply_click(event: MouseEvent){
    var obj : any = event.target;
    alert(obj.id);
  }

}
