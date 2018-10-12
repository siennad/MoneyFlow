import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getLoginStatus());

  public loggedIn = false;
  constructor() { }

  userLogin() {
    this.loggedIn = true;
    this.loginStatus.next(true);  
  }

  userLogout() {
    this.loggedIn = false;
    this.loginStatus.next(false);
  }

  getLoginStatus() {
    return this.loggedIn;
  }
}
