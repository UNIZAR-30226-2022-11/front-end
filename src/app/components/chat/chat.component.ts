import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  show:boolean=true;
  propio:boolean=true;
  try:string="beunas tardes";
  listMsg: Array<string>=["","maldvcsdvs", "creo","que ahora si"]

  mostrar(){
    this.show = !this.show;
  }

}
