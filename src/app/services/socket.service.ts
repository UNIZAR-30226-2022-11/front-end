import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';  

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	constructor(private socket: Socket) { }

  	
	//(opponent, moveFI, moveCI, moveFF, moveCF)
	sendGameMove(opponent:string, moveFI:number, moveCI:number, moveFF:number, moveCF:number) {
		this.socket.emit('sendGameMove', opponent, moveFI, moveCI, moveFF, moveCF);
		
	} 

	//op: "", side: ""
	getOpponent() {
		return this.socket.fromEvent('getOpponent');
		
	}

	//getGameMove { op: "", fI: 1, cI: 2, fF: 3, cF: 4 }
	getGameMove() {
		return this.socket.fromEvent('getGameMove');	
	}

}
