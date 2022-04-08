import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { usuario } from 'src/app/other/interfaces';
import { ServiceClientService } from '../../services/service-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup

  signupForm: FormGroup

  logged: boolean = false;
  user: usuario = {Nickname: "",
    contraseña:"",
    puntos: 0,
    monedas: 0,
    avatar: "",
    piezas: "",
    tablero: ""}

  message:string="false";

  constructor(
    private router: Router,
    private _builderSignin: FormBuilder,
    private _builderSignup: FormBuilder,
    private servicioCliente:ServiceClientService,
    ) { 
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
        fullName: ['', Validators.required],
        user: ['', Validators.required],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', [Validators.required]],
        passwordConfirm: ['', [Validators.required]]
      });
    }

  //Con esto se envia el formulario al back-end
  login(g: FormGroup) {
    //Codigo prueba
    this.user = {Nickname: g.get('user')!.value, contraseña: g.get('password')!.value, puntos: 0,monedas: 0,avatar: "",piezas: "",tablero: ""}
    this.logged = true;
    this.signinForm.reset();
    /*this.servicioCliente.Login(g.get('user')!.value,g.get('password')!.value).subscribe(resp =>{
      this.signinForm.reset();
      this.logged = true;
      this.user = resp;
    },
    error => {console.error(error)});
    */
  }

  register(g: FormGroup){
    //Codigo prueba
    this.user = {Nickname: g.get('user')!.value, contraseña: g.get('password')!.value, puntos: 0,monedas: 0,avatar: "",piezas: "",tablero: ""}
    this.logged = true;
    this.signinForm.reset();
    //Este deberia ser el codigo bueno
    /*this.servicioCliente.Register(g.get('user')!.value,g.get('password')!.value).subscribe(resp =>{
      this.signupForm.reset();
      this.logged = true;
    },
    error => {console.error(error)});
    */
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

}
