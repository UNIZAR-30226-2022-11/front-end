import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';  
import { SocketOne, SocketTwo } from '../app.module';
import { UserServiceService } from './user-service.service';

@Injectable({
	providedIn: 'root'
  })
export class SocketService{
	constructor(private socket: SocketOne) { }

  	
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

	/*//envio {'inviteFriend', <nombre de usuario de quien invita>, <nombre de usuario a qn le debe llegar la invitacion>}
	inviteFriend(friend:string){
		this.socket.emit('inviteFriend', UserServiceService.user.nickname, friend);
	}

	//quiero recibir {<nombre de usuario de qn me ha invitado>}
	getGameInvites(){
		return this.socket.fromEvent('getGameInvites')
	}

	getFriendOpponent(){
		return this.socket.fromEvent('getFriendOpponent')
	}*/

	enviarTablero(){
		return this.socket.fromEvent('enviarTablero')
	}

	recibirTablero(side:boolean, tablero:pieza[][]){
		this.socket.emit('enviarTablero', side, tablero)
	}

	oponenteDesconectado(){
		return this.socket.fromEvent('oponenteDesconectado')
	}

}

@Injectable({
	providedIn: 'root'
  })
export class SocketFriends {
  constructor(private socket: SocketTwo) { }

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

	conect(nickname:string){
		this.socket.emit('conectarse', nickname);
	}

}