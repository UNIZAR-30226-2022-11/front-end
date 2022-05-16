import { Component, OnInit } from '@angular/core';
import { ServiceClientService } from '../../services/service-client.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { FriendListServiceService } from 'src/app/services/friend-list-service.service';
@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  
  showFriendList : boolean = true;
  friendList: Array<string>=["hola"]; //DEJAR LISTA VACIA
  friendRequests: Array<string>=["adios"]; //DEJAR LISTA VACIA
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


  constructor(private servicioCliente:FriendListServiceService
    ) {console.log(servicioCliente)}

  ngOnInit(): void {
    /*if (UserServiceService.logged) {
      this.getFriendList();
      this.getFriendRequests();
    }*/
    //Traer todos los amigos del backend
    /*this.servicioCliente.GetFriendList("QWER").subscribe(datos=>{
      for(let i=0;i<datos;i++){
        this.friendList.push(datos[i]);
      }
    })*/
/*
    this.servicioCliente.GetFriendRequests("borrar").subscribe(datos=>{
      for(let i=0;i<datos;i++){
        this.friendRequests.push(datos[i]);
      }
    })*/

    /*Codigo de prueba que funciona
    this.servicioCliente.getAllPersonajes().subscribe((datos : any)=>{
      this.personajes = datos;
      console.log(this.personajes)
      for(let i=0;i<datos.results.length;i++){
        this.prueba.push(datos.results[i]);
      }
      console.log(datos.results)
      console.log(this.prueba);
    })
    */
    if (this.showFriendList){
      var element=document.getElementById("friendSelector")
      element?.classList.add('showing')
    }else{
      var element=document.getElementById("requestSelector")
      element?.classList.add('showing')
    }
  }



  InvitarAmigo(user:string){
    //SOCKETS
    //UserServiceService.user.nickname contiene el nombre del usuario logeado (por si lo necesitas)
    var val = confirm("Type your text here.");
if (val == true) {
alert("You pressed OK.");
} else {
alert("You pressed Cancel.");
}
  }

  AceptarSolicitud(user:string){
    this.servicioCliente.AcceptFriendRequest(UserServiceService.user.nickname, user).subscribe(datos=>{
      this.servicioCliente.getFriendList();
      this.servicioCliente.getFriendRequests();
    })
  }

  RechazarSolicitud(user:string){
    this.servicioCliente.DeclineFriendRequest(UserServiceService.user.nickname, user).subscribe(datos=>{
      this.servicioCliente.getFriendList();
      this.servicioCliente.getFriendRequests();
    })
  }

  

}
