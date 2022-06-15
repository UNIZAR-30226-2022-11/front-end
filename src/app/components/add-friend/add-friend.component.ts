import { Component, OnInit } from '@angular/core';
import { ServiceClientService } from '../../services/service-client.service';
import { UserServiceService } from 'src/app/services/user-service.service';
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
    if (UserServiceService.logged){
      this.servicioCliente.SendFriendRequest(UserServiceService.user.nickname, g.get('amigo')!.value).subscribe(datos=>{
          if (datos.resultado == "La solicitud se ha mandado correctamente") {
            g.reset();
            alert("La solicitud se ha mandado correctamente")
          }else{
            alert("La solicitud no se ha podido mandar")
            console.log(datos.resultado);
          }
      },
      error => {console.error(error)});
    }else{
      alert("Debes logearte para enviar solicitudes de amistad")
      console.log("not logged");
    }
  }

}
