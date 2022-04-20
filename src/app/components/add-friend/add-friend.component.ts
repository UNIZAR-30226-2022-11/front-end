import { Component, OnInit } from '@angular/core';
import { ServiceClientService } from '../../services/service-client.service';
import { LoginComponent } from '../login/login.component';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {

  requestForm: FormGroup;

  constructor(private servicioCliente:ServiceClientService,
              private _builderRequest: FormBuilder,
    ) {
      this.requestForm = this._builderRequest.group({
        amigo: ['', Validators.required]
      })
     }

  ngOnInit(): void {
  }

  SendFriendRequest(g: FormGroup){
    if (LoginComponent.logged){
      this.servicioCliente.SendFriendRequest(LoginComponent.user.nickname, g.get('amigo')!.value).subscribe(datos=>{
          if (datos.resultado == "La solicitud se ha mandado correctamente") {
            g.reset();
          }else{
            console.log(datos.resultado);
          }
      },
      error => {console.error(error)});
    }else{
      console.log("not logged");
    }
  }

}
