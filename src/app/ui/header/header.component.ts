import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginStatus;
  username = 'user';
  constructor( private userService: UserService ) {
    this.userService.loginStatus.subscribe( value => {
      console.log(value);
      this.loginStatus = value;
      if (value) {
        this.username = this.userService.userLog ? this.userService.userLog.name : 'user';
      }
    });
  }

  logout() {
    this.userService.userLogout();
  }

  ngOnInit() {}

}
