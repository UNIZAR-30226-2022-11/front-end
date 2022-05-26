import { Component, OnInit } from '@angular/core';
import { tournament } from 'src/app/other/interfaces';
import { TournamentsService } from 'src/app/services/tournaments-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
@Component({
  selector: 'app-search-tournament',
  templateUrl: './search-tournament.component.html',
  styleUrls: ['./search-tournament.component.css']
})
export class SearchTournamentComponent implements OnInit {

  tournaments:Array<tournament> = [
    {owner: 'pepito',players: 2}
  ]

  constructor(private serviceTournaments: TournamentsService) { }

  ngOnInit(): void {
    if (UserServiceService.logged){
     this.buscarTorneos();
    }
  }

  join(owner:string){
    
  }

  buscarTorneos(){
    this.serviceTournaments.obtenerTorneosPublicos().subscribe(datos=>{
      this.tournaments = [];
      for(let i=0;i<datos.articulos.length;i++){
          this.tournaments.push(datos.articulos[i]);

      }
    })

  }
}
