import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(
    public _user: UserService,
    public _api: ApiService
    ) { }

  ngOnInit(): void {

  }

  Contador = 0
  nombre = "Ernesto"
  arr = [1,2,3,4,5,6,7,8,9,10]
  cambiarNombre() {
    this.nombre = "Carlos"
  }

  suma(){
    this.Contador ++
  }

  add(){
    this.arr.push(this.Contador)
  }

  login(){
    const user = (document.querySelector('#user') as HTMLInputElement).value
    const password = (document.querySelector('#password') as HTMLInputElement).value
    this._api.login(user, password).subscribe(response =>{
        if (response.success){
          this._user.user = response.user
          console.log(this._user.user)
        }
    })
  }
}
