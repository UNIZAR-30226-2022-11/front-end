import { Component, OnInit } from '@angular/core';
import { friend } from 'src/app/other/interfaces';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  
  showFriendList : boolean = true;
  friendList: friend[]= [ {name:"Gueorgui Alexandrovitch", points:1000, img:"gfsa"},  {name:"Ernesto Bielsa", points:1012, img:"gfsa"},{name:"Gueorgui Alexandrovitch", points:1000, img:"gfsa"},  {name:"Ernesto Bielsa", points:1012, img:"gfsa"},{name:"Gueorgui Alexandrovitch", points:1000, img:"gfsa"},  {name:"Ernesto Bielsa", points:1012, img:"gfsa"},{name:"Gueorgui Alexandrovitch", points:1000, img:"gfsa"},  {name:"Ernesto Bielsa", points:1012, img:"gfsa"}];
  friendRequests: friend[] = [{name:"Gueorgui Alexandrovitch2", points:1000, img:"gfsa"},  {name:"Ernesto Bielsa2", points:1012, img:"gfsa"}]

  modifyButtonsClasses (event:MouseEvent){
    var obj : any = event.target;
    //Quitamos la clase selector de todos los selectores
    var class_name="showing";
    const collection = document.getElementsByClassName(class_name);
    for (let i = 0; i < collection.length; i++) {
      collection[i].classList.remove(class_name);
    } 
    //Le damos la clase selector al boton clickado
    if (obj.id == "friendSelector"){
      this.showFriendList = true;
      var element=document.getElementById(obj.id)
      element?.classList.add('showing')
    }else{
      this.showFriendList = false;
      var element=document.getElementById(obj.id)
      element?.classList.add('showing')
    }
    
  }


  constructor() {}

  ngOnInit(): void {
    if (this.showFriendList){
      var element=document.getElementById("friendSelector")
      element?.classList.add('showing')
    }else{
      var element=document.getElementById("requestSelector")
      element?.classList.add('showing')
    }
  }

}
