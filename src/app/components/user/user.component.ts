import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { console.log(this.nivel)}

  isLogged: boolean = false

  desactivado = false
  nivel = 5
  titulo: string = 'ernes'
  ngOnInit(): void {
  }
  log(titulo:string){
    console.log(this.titulo)
  }
}
