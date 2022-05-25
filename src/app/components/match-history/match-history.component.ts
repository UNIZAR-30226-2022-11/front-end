import { Component, OnInit } from '@angular/core';
import { ServiceClientService } from '../../services/service-client.service';
import { matchHistory } from 'src/app/other/interfaces';
import { UserServiceService } from 'src/app/services/user-service.service';
@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.css']
})
export class MatchHistoryComponent implements OnInit {

  constructor(private servicioCliente:ServiceClientService
    ) {console.log(servicioCliente)}

  matchHistory: Array<matchHistory> =[];

  ngOnInit(): void {
    if (UserServiceService.logged) {
      this.getMatchHistory();
    }
   
  }

  getMatchHistory(){
    this.servicioCliente.GetMatchHistory(UserServiceService.user.nickname).subscribe(datos=>{
      this.matchHistory = [];
      for(let i=0;i<datos.matchHistory.length;i++){
        var aux: matchHistory = {
          rival: datos.matchHistory[i].rival,
          empate: datos.matchHistory[i].empate,
          ganador: datos.matchHistory[i].ganador
        }
        this.matchHistory.push(aux);
      }
    })
  }

}
