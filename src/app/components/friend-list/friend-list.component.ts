import { Component, OnInit } from '@angular/core';
import { friend } from 'src/app/other/interfaces';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  showFriendList : boolean = false;
  friendList: friend[]= [ {name:"Gueorgui Alexandrovitch", points:1000, img:"gfsa"},  {name:"Ernesto Bielsa", points:1012, img:"gfsa"}];
  friendRequests: friend[] = [{name:"Gueorgui Alexandrovitch2", points:1000, img:"gfsa"},  {name:"Ernesto Bielsa2", points:1012, img:"gfsa"}]


  constructor() {}

  ngOnInit(): void {
  }

}
