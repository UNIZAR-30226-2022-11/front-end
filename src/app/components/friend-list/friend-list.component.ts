import { Component, OnInit } from '@angular/core';
import { ServiceClientService } from '../../services/service-client.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { FriendListServiceService } from 'src/app/services/friend-list-service.service';
import { SocketFriends, SocketService } from 'src/app/services/socket.service';
import { Router,NavigationStart} from '@angular/router';
import { JuegoComponent } from '../juego/juego.component';
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
    protected socketService: SocketFriends,
    private router: Router,
    protected socketPartidas: SocketService
    ) {console.log(servicioCliente)}

  ngOnInit(): void {

    if (this.showFriendList){
      var element=document.getElementById("friendSelector")
      element?.classList.add('showing')
    }else{
      var element=document.getElementById("requestSelector")
      element?.classList.add('showing')
    }
      //this.socketService.conect(UserServiceService.user.nickname);
      this.socketService.getGameInvites().subscribe((data: any) => {
        var val = confirm(data.nick + " te ha invitado a una partida online.");
        if (val == true) {
          JuegoComponent.minutos = 3;
          JuegoComponent.segundos = 0;
          JuegoComponent.ia = false;
          JuegoComponent.online = true;
          JuegoComponent.modoJuego = "A"
          JuegoComponent.amigo = data.nick;
          this.socketService.confirmGameFriend(data.nick);
          this.router.navigate(['/juego']);
          //this.socketPartidas.buscarPartida(UserServiceService.user.nickname, "A", UserServiceService.user.avatar, data.nick);
          
          alert("Partida aceptada.");
        } else {
          this.router.navigate(['/play']);
          alert("Partida rechazada.");
        }
      });

      this.socketService.obtenerEstados().subscribe((data:any) => {
        this.ActualizarEstados(data);
        
      })

    
  }

  ActualizarEstados(data:any){
    for(let i=0;i<FriendListServiceService.friendList.length;i++){
      var encontrado:boolean = false;
      for (let j = 0; j < data.estados.length; j++){
        if (FriendListServiceService.friendList[i].nickname == data.usuarios[j].nickname){
          encontrado = true;
          FriendListServiceService.friendList[i].estado= data.usuarios[j].estado;
          break;
        }
        
      }
      if (!encontrado){
        FriendListServiceService.friendList[i].estado= "offline";
      }
    }
  }



  InvitarAmigo(friend:string){
    this.socketService.inviteFriend(friend);
    this.socketService.getFriendOpponent().subscribe((data: any)=>{
      //this.socketPartidas.buscarPartida(UserServiceService.user.nickname, "A", UserServiceService.user.avatar, data.rival);

        JuegoComponent.minutos = 3;
        JuegoComponent.segundos = 0;
        JuegoComponent.ia = false;
        JuegoComponent.online = true;
        JuegoComponent.modoJuego = "A"
        JuegoComponent.amigo = data.rival;

    
      this.router.navigate(['/juego']);
    })
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
