import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap, map } from 'rxjs/operators';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getLoginStatus());

  public loggedIn = false;
  constructor(private http: Http) { }

  userLogin(user) {
    this.loggedIn = true;
    this.loginStatus.next(true);
    this.verifyUser(user);
  }

  userLogout() {
    this.loggedIn = false;
    this.loginStatus.next(false);
  }

  getLoginStatus() {
    return this.loggedIn;
  }

  addUser(user) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post('/api/user/add', user, options)
    .pipe(map(res => res.json()));
  }

  verifyUser(user) {
    const headers = new Headers({'contentType': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post('/api/user/verify', user, options)
    .pipe(map(res => res.json()));
  }
}
