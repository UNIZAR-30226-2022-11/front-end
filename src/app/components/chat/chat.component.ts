import { Component, OnInit } from '@angular/core';
import { msgChat } from 'src/app/other/interfaces';
import { SocketService } from 'src/app/services/socket.service';
import { JuegoComponent } from '../juego/juego.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent{


  static socketService: SocketService
  static opponent: string
  show:boolean=false;
  propio:boolean=true;
  listMsg: Array<msgChat>=[] //30 caracters por linea
  

  ngOnInit(): void {
    ChatComponent.conectado = false;
    this.show = false;
  }
  static conectado: boolean = false;
  primera:boolean = false

  mostrar(){
    if(ChatComponent.conectado)
    if(!this.primera){ this.recibir(); this.primera = true}
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
        //send
        console.log("escribiendo")
        console.log("socket")
        console.log(ChatComponent.socketService)
        console.log("opponent")
        console.log(ChatComponent.opponent)
        ChatComponent.socketService.sendMessage(ChatComponent.opponent, newMsg.texto)
        j = 0
        lineaNew = ""
      }
    }
    if(j!=0){
      lineaNew = linea.substring(i-j, i)
      newMsg = {texto:lineaNew, side:true}
      this.listMsg.push(newMsg)
      //send
      ChatComponent.socketService.sendMessage(ChatComponent.opponent, newMsg.texto)
    }
  }

  recibir(){


    var linea:string =""
    var newMsg:msgChat;
    var lineaNew:string = ""
    var i,j:number = 0;

    ChatComponent.socketService.getMessage().subscribe((data: any) => {
      //pillar cadena de websocket
      linea = data.msg
      for(i = 0; linea[i] != null; i++){
        //console.log(linea[i])
        j++
        if(j >= 30){
          lineaNew = linea.substring(i-j+1, i+1)
          // console.log(i-j+1)
          // console.log(i+1)
          newMsg = {texto:lineaNew, side:false}
          this.listMsg.push(newMsg)
          j = 0
          lineaNew = ""
        }
      }

      if(j!=0){
        lineaNew = linea.substring(i-j, i)
        newMsg = {texto:lineaNew, side:false}
        this.listMsg.push(newMsg)
      }
    })

  }

}
