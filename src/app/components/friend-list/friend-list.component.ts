import { Component, OnInit } from '@angular/core';
import { amigos } from 'src/app/other/interfaces';
import { ServiceClientService } from '../../services/service-client.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  
  showFriendList : boolean = true;
  friendList: Array<amigos>=[];
  friendRequests: Array<amigos>=[];
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


  constructor(private servicioCliente:ServiceClientService
    ) {}

  ngOnInit(): void {
    //Traer todos los amigos del backend
    this.servicioCliente.GetFriendList("borrar").subscribe(datos=>{
      for(let i=0;i<datos;i++){
        this.friendList.push(datos[i]);
      }
    })

    this.servicioCliente.GetFriendRequests("borrar").subscribe(datos=>{
      for(let i=0;i<datos;i++){
        this.friendRequests.push(datos[i]);
      }
    })

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

  /*deleteFriend(friend){
    this.servicioCliente.deleteFriend(friend.)
  }*/

}
