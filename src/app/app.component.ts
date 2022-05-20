import { Component } from '@angular/core';
import { UserServiceService } from './services/user-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private servicioUser:UserServiceService) { }

  ngOnDestroy(){
    if (UserServiceService.logged){
      this.servicioUser.LogOut(UserServiceService.user.nickname).subscribe(resp=>{});
    }
    
  }
}
