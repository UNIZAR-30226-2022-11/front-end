import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup

  signupForm: FormGroup

  constructor(
    private router: Router,
    private _builderSignin: FormBuilder,
    private _builderSignup: FormBuilder
    ) { 
      this.signinForm = this._builderSignin.group({
        user: ['', Validators.required],
        password: ['', Validators.required]
      })
      this.signupForm = this._builderSignup.group({
        fullName: ['', Validators.required],
        user: ['', Validators.required],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password:  ['', Validators.required],
        passwordConfirm: ['', Validators.required] 
      })
    }

  //Con esto se envia el formulario al back-end
  enviar(values) {
    console.log(values)
  }

  ngOnInit(): void {
  }

  btnClick() {
    this.router.navigateByUrl('/home');
  }


}
