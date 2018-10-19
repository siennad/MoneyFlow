import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { delay, tap, map } from 'rxjs/operators';
import { RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
/*import { HttpInterceptor } from '@angular/common/http';*/
import { User } from '../user/user.model';
import { stringify } from '@angular/core/src/util';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  domain = environment.domain;

  public loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getLoginStatus());
  public userLog;

  constructor(private http: HttpClient, ) {
  }

  userLogout() {
    this.loginStatus.next(false);
    // remove all local storae data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (localStorage.getItem('budget')) { localStorage.removeItem('budget'); }
    if (localStorage.getItem('expenseList')) { localStorage.removeItem('expenseList'); }
  }

  getLoginStatus() {
    if ( localStorage.getItem('user') != null ) {
      this.userLog = JSON.parse(localStorage.getItem('user'));
      return true;
    } else {
      return false;
    }
  }

  addUser(user) {
    this.http.post<any>(this.domain + '/api/user/add', {user : user} ).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.userLogged));
        this.loginStatus.next(true);
        this.userLog = res;
      },
      err => alert(err.error)
    );
  }

  verifyUser(user) {
    this.http.post<any>(this.domain + '/api/user/verify', {user: user}).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.userLogged));
        this.loginStatus.next(true);
        this.userLog = res;
      },
      err => alert(err.error)
    );
  }

}
