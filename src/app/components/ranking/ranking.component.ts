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

  rankingBefore: Array<rankingItem>=[]
  
  rankingList: Array<rankingItem> = []

  constructor(private servicioCliente:ServiceClientService) { }

  ngOnInit(): void {
    if (UserServiceService.logged) {
      this.getRankingList();
    }
  }

  getRankingList(){
    this.servicioCliente.GetRankingList(UserServiceService.user.nickname).subscribe(datos=>{
      console.log(datos.rankingList[3]);
      this.rankingList = []
      for(let i=0;i<datos.rankingList.length;i++){
        console.log(datos.rankingList[i]);
        if (datos.rankingList[i] == null){continue;}
        
          this.rankingList.push(datos.rankingList[i]);
        
      }
      console.log(this.rankingList);
    })
  }

  get getUserName():string{
    return UserServiceService.user.nickname;
  }
  
}
