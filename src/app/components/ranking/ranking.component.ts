import { Component, OnInit } from '@angular/core';
import { rankingItem } from 'src/app/other/interfaces';
import { ServiceClientService } from 'src/app/services/service-client.service';
import { UserServiceService } from 'src/app/services/user-service.service';
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
    if (UserServiceService.logged) {
      this.getRankingList();
    }
  }

  getRankingList(){
    this.servicioCliente.GetRankingList(UserServiceService.user.nickname).subscribe(datos=>{
      console.log(datos.rankingList[3]);
      this.rankingList = [];
      for(let i=0;i<datos;i++){
        this.rankingList.push(datos.rankingList[i]);
      }
    })
  }

  get getUserName():string{
    return UserServiceService.user.nickname;
  }
  
}
