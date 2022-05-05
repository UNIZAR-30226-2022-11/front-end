import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  opponent: string[] = [];

	constructor(
		//private socketService: SocketService 
	) { }

  
  // here we can use socket events and listeners using socketService
  ngOnInit(): void {
		//this.socketService.sendGameMove();
		//this.socketService.getOpponent().subscribe((data: any) => this.opponent = data)
    //data.par para cada cosa devuelta
	}
}
