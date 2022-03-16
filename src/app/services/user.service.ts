import { Injectable } from '@angular/core';
import { User } from '../other/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user!: User
  constructor() { }

  
}
