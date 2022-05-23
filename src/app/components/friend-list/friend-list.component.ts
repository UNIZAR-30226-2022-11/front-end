import { Component, OnInit } from '@angular/core';
import { ServiceClientService } from '../../services/service-client.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { FriendListServiceService } from 'src/app/services/friend-list-service.service';
import { SocketService } from 'src/app/services/socket.service';
@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  
  showFriendList : boolean = true;
  //friendList: Array<string>=["hola"]; //DEJAR LISTA VACIA
  //friendRequests: Array<string>=["adios"]; //DEJAR LISTA VACIA
  //friendRequests: Array<any> = [];
  //personajes: any=[];
  //prueba: Array<any>=[];
  modifyButtonsClasses (event:MouseEvent){
    var obj : any = event.target;
    //Quitamos la clase selector de todos los selectores
    var class_name="showing";
    const collection = document.getElementsByClassName(class_name);
    for (let i = 0; i < collection.length; i++) {
      collection[i].classList.remove(class_name);
    } 
    //Le damos la clase selector al boton clickado
    if (obj.id == "friendSelector"){
      this.showFriendList = true;
      var element=document.getElementById(obj.id)
      element?.classList.add('showing')
    }else{
      this.showFriendList = false;
      var element=document.getElementById(obj.id)
      element?.classList.add('showing')
    }
    
  }


  constructor(private servicioCliente:FriendListServiceService,
    protected socketService: SocketService,
    ) {console.log(servicioCliente)}

  ngOnInit(): void {

    if (this.showFriendList){
      var element=document.getElementById("friendSelector")
      element?.classList.add('showing')
    }else{
      var element=document.getElementById("requestSelector")
      element?.classList.add('showing')
    }
    this.socketService.getGameInvites().subscribe((data: any) => {
      var val = confirm(data + " te ha invitado a una partida online.");
      if (val == true) {
        alert("Partida aceptada.");
      } else {
        alert("Partida rechazada.");
      }
    });
  }



  InvitarAmigo(friend:string){
    this.socketService.inviteFriend(friend);
  }

  AceptarSolicitud(user:string){
    this.servicioCliente.AcceptFriendRequest(UserServiceService.user.nickname, user).subscribe(datos=>{
      if (datos.exito){
        this.servicioCliente.getFriendList();
        this.servicioCliente.getFriendRequests();
      }
    })
  }

  RechazarSolicitud(user:string){
    this.servicioCliente.DeclineFriendRequest(UserServiceService.user.nickname, user).subscribe(datos=>{
      if (datos.exito){
        this.servicioCliente.getFriendList();
        this.servicioCliente.getFriendRequests();
      }
    })
  }

  get friendList(){
    return FriendListServiceService.friendList;
  }

  get friendRequests(){
    return FriendListServiceService.friendRequests;
  }

}
