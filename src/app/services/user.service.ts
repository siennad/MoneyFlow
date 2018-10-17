import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
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

  public userLog; // : Subject<User> = new Subject<User>() ;

  userLogout() {
    this.loggedIn = false;
    this.loginStatus.next(false);
    // console.log(localStorage.getItem('token'));
    localStorage.removeItem('token');
  }

  getLoginStatus() {
    return this.loggedIn ; // = localStorage.getItem('token') != null ? true : false;
  }

  addUser(user) {
    this.http.post<any>('http://localhost:8080/api/user/add', {user : user} ).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.loginStatus.next(true);
        this.userLog = res.userLogged;
      },
      err => alert(err.error)
    );
  }

  verifyUser(user) {
    this.http.post<any>('http://localhost:8080/api/user/verify', {user: user}).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.loginStatus.next(true);
        this.userLog = res.userLogged;
        console.log(this.userLog);
      },
      err => alert(err.error)
    );
  }

}
