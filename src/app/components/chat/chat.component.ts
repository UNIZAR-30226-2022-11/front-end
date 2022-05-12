import { Component, OnInit } from '@angular/core';
import { msgChat } from 'src/app/other/interfaces';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  show:boolean=true;
  propio:boolean=true;
  msg:msgChat = {texto:"hi hi", side:false}
  listMsg: Array<msgChat>=[{texto:"fd", side:true}, this.msg] //30 caracters por linea

  mostrar(){
    this.show = !this.show;
  }

  escribir(linea:string){
    var newMsg:msgChat;
    //var linea:string = "12345678901234567890123456789012345678901234567890123456789012345678901234567890123"
    var lineaNew:string = ""
    var i,j:number = 0;
    for(i = 0; linea[i] != null; i++){
      //console.log(linea[i])
      j++
      if(j >= 30){
        lineaNew = linea.substring(i-j+1, i+1)
        // console.log(i-j+1)
        // console.log(i+1)
        newMsg = {texto:lineaNew, side:true}
        this.listMsg.push(newMsg)
        j = 0
        lineaNew = ""
      }
    }
    if(j!=0){
      lineaNew = linea.substring(i-j, i)
      newMsg = {texto:lineaNew, side:true}
      this.listMsg.push(newMsg)
    }
  }

}
