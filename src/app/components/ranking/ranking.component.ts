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
      //var rankingAux = []
      for(let i=0;i<datos.rankingList.length;i++){
        if (datos.rankingList[i] == null){continue;}
        this.rankingList.push(datos.rankingList[i]);
      }

      for(let i=0;i<this.rankingList.length;i++){
        var max = i;
        for (let j = i + 1; j <this.rankingList.length; j++){
          if (this.rankingList[j].puntos > this.rankingList[max].puntos){
            max = j;
          }
        }if (max != i){
          var aux:rankingItem   = this.rankingList[max];
          this.rankingList[max] = this.rankingList[i];
          this.rankingList[i] = aux;
        }
        console.log(datos.rankingList[i]);
        
        
      }
      //if 
      console.log(this.rankingList);
    })
  }

  get getUserName():string{
    return UserServiceService.user.nickname;
  }
  
}
