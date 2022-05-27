import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tournament } from 'src/app/other/interfaces';
import { TournamentsService } from 'src/app/services/tournaments-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { TournamentsComponent } from '../tournaments/tournaments.component';
@Component({
  selector: 'app-search-tournament',
  templateUrl: './search-tournament.component.html',
  styleUrls: ['./search-tournament.component.css']
})
export class SearchTournamentComponent implements OnInit {

  tournaments:Array<tournament> = [
    {owner: 'pepito',players: 2}
  ]

  constructor(private serviceTournaments: TournamentsService,
    private router: Router) { }

  ngOnInit(): void {
    if (UserServiceService.logged){
     this.buscarTorneos();
    }
  }

  join(owner:string){
    console.log(owner);
    this.serviceTournaments.entrarTorneo(owner);
    TournamentsComponent.propietario = false;
    TournamentsComponent.owner = owner;
    this.router.navigate(['/tournaments'])
  }

  buscarTorneos(){
    this.serviceTournaments.obtenerTorneosPublicos().subscribe(datos=>{
      this.tournaments = [];
      for(let i=0;i<datos.length;i++){
        var aux:tournament= {
          owner: datos[i].creador,
          players: datos[i].jugadores,
        }
        console.log(aux);
          this.tournaments.push(aux);

      }
    })

  }
}
