import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';  
import { SocketOne, SocketTwo, SocketThree } from '../app.module';
import { TimerComponent } from '../components/timer/timer.component';
import { pieza } from '../other/interfaces';
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

	//op: "", side: "", load="", tablero: "", turn=, t1, t1, avatar, friends
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

	buscarPartida(nickname:string, modoJuego:string, avatar:string, friend:string){
		this.socket.emit('buscarPartida', nickname, modoJuego, avatar, friend);	
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

	recibirTablero(side:boolean, tablero:pieza[][], turno:boolean, t1:TimerComponent){
		this.socket.emit('enviarTablero', side, tablero, turno, t1)
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

	//envia <nombre de quien ha aceptado>, <nombre de quien le envió la solicitud>}
	confirmGameFriend(friend:string){
		this.socket.emit('confirmGameFriend', UserServiceService.user.nickname, friend);
	}
	

	//devuelve {<nombre de usuario de qn ha aceptado la partida>}
	getFriendOpponent(){
		return this.socket.fromEvent('getFriendOpponent')
	}

	conect(nickname:string){
		this.socket.emit('conectarse', nickname);
	}

	inGame(nickname:string){
		this.socket.emit('ingame', nickname);
	}

	//devuelve usuarios
	obtenerEstados(){
		return this.socket.fromEvent('usuariosConectados');
	}

}

@Injectable({
	providedIn: 'root'
  })
export class SocketTournaments {
  constructor(private socket: SocketThree) { }

  esperarJugadores(){
    return this.socket.fromEvent('esperarJugadores');
  }

  

  unirseTorneo(owner:string, nickname:string){
    this.socket.emit('unirseTorneo',owner, nickname);
  }


  empezar(owner: string){
    this.socket.emit('empezar',owner);
  }

  recibirOrden(){
	  return this.socket.fromEvent('recibirOrden');
  }
}