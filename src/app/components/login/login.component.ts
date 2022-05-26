import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { avatarPath, usuario } from 'src/app/other/interfaces';
import { ServiceClientService } from '../../services/service-client.service';
import * as bcrypt from 'bcryptjs';
import { FriendListComponent } from '../friend-list/friend-list.component';
import { UserServiceService } from 'src/app/services/user-service.service';
import { FriendListServiceService } from 'src/app/services/friend-list-service.service';
import { SocketFriends } from 'src/app/services/socket.service';
const salt = bcrypt.genSaltSync(10);


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup

  signupForm: FormGroup

  /*static logged: boolean = false;
  static user: usuario ={ nickname: "",
                        puntos: 0,
                        monedas: 0,
                        avatar: "",
                        piezas: "",
                        tablero: ""
  }*/


  constructor(
    private router: Router,
    private _builderSignin: FormBuilder,
    private _builderSignup: FormBuilder,
    private servicioCliente:ServiceClientService,
    private userVerification:UserServiceService,
    private friendListService:FriendListServiceService,
    private socket: SocketFriends,
    ) { 
      console.log(servicioCliente)
      this.signinForm = this._builderSignin.group({
        user: ['', Validators.required],
        password: ['', Validators.required]
      })
      //Opcion A
      /*this.signupForm = this._builderSignup.group({
        fullName: ['', Validators.required],
        user: ['', Validators.required],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        passwords: this._builderSignup.group({
          password: ['', [Validators.required]],
          passwordConfirming: ['', [Validators.required]],
      }, {validator: this.passwordConfirming}),
      });*/
      //Opcion B
      this.signupForm = this._builderSignup.group({
        //fullName: ['', Validators.required],
        user: ['', Validators.required],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(5),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])],
        passwordConfirm: ['', [Validators.required]]
      });
    }

  //Con esto se envia el formulario al back-end
  login(g: FormGroup) {
    //const salt = bcrypt.genSalt(10);
    //var pass = bcrypt.hash(g.get('password')!.value, 10);
    var pass = bcrypt.hashSync(g.get('password')!.value, salt);
    //console.log(pass);
    console.log(g.get('password')!.value)
    //this.userVerification.Login(g.get('user')!.value, pass).subscribe(resp =>{
    this.userVerification.Login(g.get('user')!.value, g.get('password')!.value).subscribe(resp =>{
      if (resp.nickname == g.get('user')!.value) {
        this.signinForm.reset();
        UserServiceService.logged = true;
        UserServiceService.user = resp;
        this.socket.conect(UserServiceService.user.nickname);
       // FriendListComponent.getFriendList();
       // SI NO SE CARGAN LOS AMIGOS Y SOLICITUDES AL LOGEARSE SE DEBE EJECUTAR DESDE AQUI
       console.log("save match");
       
        this.friendListService.refreshLists();
      }else{
        console.log(resp.exito);
      }
      
    },
    error => {console.error(error)});
    
  }

  register(g: FormGroup){
    //Este deberia ser el codigo bueno
    var pass = bcrypt.hashSync(g.get('password')!.value, salt);
    //this.userVerification.Register( g.get('user')!.value,  pass, g.get('email')!.value).subscribe(resp =>{
    this.userVerification.Register( g.get('user')!.value,  g.get('password')!.value, g.get('email')!.value).subscribe(resp =>{
      if (resp.exito == true) {
        var user = g.get('user')!.value
        this.signupForm.reset();
        UserServiceService.logged = true;
        UserServiceService.user.nickname = resp.user.nickname; 
        this.socket.conect(UserServiceService.user.nickname);
        this.servicioCliente.GetPoints(user).subscribe(resp=>{
          UserServiceService.user.puntos = resp.points.points;
        });
        this.servicioCliente.BuyItem(user,"BoardGris","table").subscribe(resp=>{})
        this.servicioCliente.UpdateTable(user,"BoardGris").subscribe(resp=>{})
        
        this.servicioCliente.BuyItem(user,"knight_avatar","avatar").subscribe(resp=>{})
        this.servicioCliente.UpdatePieces(user,"knight_avatar").subscribe(resp=>{})

        this.servicioCliente.BuyItem(user,"default_Piezas","pieces").subscribe(resp=>{})
        this.servicioCliente.UpdatePieces(user,"default_Piezas").subscribe(resp=>{})

        // SI NO SE CARGAN LOS AMIGOS Y SOLICITUDES AL REGISTRARSE SE DEBE EJECUTAR DESDE AQUI
        //FriendListComponent.
        this.friendListService.refreshLists();
      }else{
        console.log(resp.exito);
      }
    },
    error => {console.error(error)});
    
  }
  //Esto va junto a la Opcion A
  /*passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password')!.value !== c.get('passwordConfirm')!.value) {
        return {invalid: true};
    }
    else {return {invalid: false}}
  }*/

  ngOnInit(): void {
  }


  get staticUsuario():usuario{
    return UserServiceService.user;
  }

  get staticLogged():boolean{
    return UserServiceService.logged;
  }

  get staticUsername():string{
    return UserServiceService.user.nickname;
  }

  avatarPath = avatarPath;
  get avatar(){
    return this.avatarPath[UserServiceService.user.avatar];
  }

  logOut(){
    this.userVerification.LogOut(UserServiceService.user.nickname).subscribe(resp=>{
      console.log(resp);
      if (resp.exito){
        window.location.reload();
      }
    });
    
  }

  hacedAlgo(){ //borrar
    //console.log("pq no va")
    //this.servicioCliente.SaveMatchResult("contra", "contra2", "lose").subscribe(resp=>{});
    //this.servicioCliente.SaveMatchResult("contra2", "contra", "win").subscribe(resp=>{});
    
  }
}
