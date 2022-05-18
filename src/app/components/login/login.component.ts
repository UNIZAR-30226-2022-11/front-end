import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { usuario } from 'src/app/other/interfaces';
import { ServiceClientService } from '../../services/service-client.service';
import * as bcrypt from 'bcryptjs';
import { FriendListComponent } from '../friend-list/friend-list.component';
import { PasswordValidatorService } from 'src/app/services/password-validator.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { FriendListServiceService } from 'src/app/services/friend-list-service.service';
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
        password: ['', Validators.compose([Validators.required])],
        passwordConfirm: ['', [Validators.required]]
      });
    }

  //Con esto se envia el formulario al back-end
  login(g: FormGroup) {
    //const salt = bcrypt.genSalt(10);
    //var pass = bcrypt.hash(g.get('password')!.value, 10);
    var pass = bcrypt.hashSync(g.get('password')!.value, salt);
    console.log(pass);
    this.userVerification.Login(g.get('user')!.value, pass).subscribe(resp =>{
      if (resp.exito == true) {
        this.signinForm.reset();
        UserServiceService.logged = true;
        UserServiceService.user = resp.user;
       // FriendListComponent.getFriendList();
       // SI NO SE CARGAN LOS AMIGOS Y SOLICITUDES AL LOGEARSE SE DEBE EJECUTAR DESDE AQUI
        this.friendListService.refreshLists();
      }else{
        console.log(resp.exito);
      }
      
    },
    error => {console.error(error)});
    
  }

  register(g: FormGroup){
    console.log("no va");
    //Este deberia ser el codigo bueno
    var pass = bcrypt.hashSync(g.get('password')!.value, salt);
    this.userVerification.Register( g.get('user')!.value,  pass, g.get('email')!.value).subscribe(resp =>{
      if (resp.exito == true) {
        this.signupForm.reset();
        UserServiceService.logged = true;
        UserServiceService.user = resp.user; 
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
}
