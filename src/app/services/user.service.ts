import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap, map } from 'rxjs/operators';
import { RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
/*import { HttpInterceptor } from '@angular/common/http';*/
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getLoginStatus());

  public loggedIn = false;
  constructor(private http: HttpClient, ) { }

  userLogout() {
    this.loggedIn = false;
    this.loginStatus.next(false);
    console.log(localStorage.getItem('token'));

    localStorage.removeItem('token');
  }

  getLoginStatus() {
    return this.loggedIn;
  }

  addUser(user) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post<any>('http://localhost:8080/api/user/add', user);
  }

  verifyUser(user) {
    const headers = new Headers({'contentType': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post<any>('http://localhost:8080/api/user/verify', user);
  }
}
