import { Component, OnInit } from '@angular/core';
import { tournament } from 'src/app/other/interfaces';
@Component({
  selector: 'app-search-tournament',
  templateUrl: './search-tournament.component.html',
  styleUrls: ['./search-tournament.component.css']
})
export class SearchTournamentComponent implements OnInit {

  tournaments:Array<tournament> = [
    {owner: 'pepito',players: 2}
  ]

  constructor() { }

  ngOnInit(): void {
  }

  join(owner:string){
    
  }

}
