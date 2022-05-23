import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';  
import { UserServiceService } from './user-service.service';

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	constructor(private socket: Socket) { }

  	
	//(opponent, moveFI, moveCI, moveFF, moveCF)
	sendGameMove(moveFI:number, moveCI:number, moveFF:number, moveCF:number) {
		this.socket.emit('sendGameMove', moveFI, moveCI, moveFF, moveCF);
		
	} 

	//op: "", side: "", tablero: ""
	getOpponent() {
		return this.socket.fromEvent('getOpponent');
		
	}

	//getGameMove { op: "", fI: 1, cI: 2, fF: 3, cF: 4 }
	getGameMove() {
		return this.socket.fromEvent('getGameMove');	
	}

	//getMessage {msg: ""}
	getMessage() {
		return this.socket.fromEvent('getMessage');	
	}

	//sendMessage(msg:string)
	sendMessage(msg:string) {
		this.socket.emit('sendMessage', msg);	
	}

	buscarPartida(nickname:string, modoJuego:string){
		this.socket.emit('buscarPartida', nickname, modoJuego);	
	}

	//envio {'inviteFriend', <nombre de usuario de quien invita>, <nombre de usuario a qn le debe llegar la invitacion>}
	inviteFriend(friend:string){
		this.socket.emit('inviteFriend', UserServiceService.user.nickname, friend);
	}

	//quiero recibir {<nombre de usuario de qn me ha invitado>}
	getGameInvites(){
		return this.socket.fromEvent('getGameInvites')
	}

	getFriendOpponent(){
		return this.socket.fromEvent('getFriendOpponent')
	}

}
