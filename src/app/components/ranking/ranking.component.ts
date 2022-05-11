import { Component, OnInit } from '@angular/core';
import { rankingItem } from 'src/app/other/interfaces';
import { LoginComponent } from '../login/login.component';
import { ServiceClientService } from 'src/app/services/service-client.service';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {


  rankingList: Array<rankingItem> = [
    {
      position:1,username:"asf",points:10
    },
    {
      position:2,username:"",points:10
    },
    {
      position:3,username:"Ernesto",points:10
    }
  ];

  constructor(private servicioCliente:ServiceClientService) { }

  ngOnInit(): void {
    if (LoginComponent.logged) {
      this.getRankingList();
    }
  }

  getRankingList(){
    this.servicioCliente.GetRankingList(LoginComponent.user.nickname).subscribe(datos=>{
      this.rankingList = [];
      for(let i=0;i<datos;i++){
        this.rankingList.push(datos.rankingList[i]);
      }
    })
  }

  get getUserName():string{
    return LoginComponent.user.nickname;
  }
  
}
