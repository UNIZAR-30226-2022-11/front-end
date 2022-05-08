import { Component, OnInit } from '@angular/core';
import { ServiceClientService } from '../../services/service-client.service';
import { matchHistory } from 'src/app/other/interfaces';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.css']
})
export class MatchHistoryComponent implements OnInit {

  constructor(private servicioCliente:ServiceClientService
    ) {console.log(servicioCliente)}

  matchHistory: Array<matchHistory> =[
    {
      rival:"a",ganador:true,empate:true
    },
    {
      rival:"b",ganador:true,empate:false
    },
    {
    rival:"c",ganador:false,empate:false
    }
  ];

  ngOnInit(): void {
    if (LoginComponent.logged) {
      this.getMatchHistory();
    }
   
  }

  getMatchHistory(){
    this.servicioCliente.GetMatchHistory(LoginComponent.user.nickname).subscribe(datos=>{
      for(let i=0;i<datos;i++){
        this.matchHistory.push(datos.friendList[i]);
      }
    })
  }

}
