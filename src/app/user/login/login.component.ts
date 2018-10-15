import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = 'aaa@g.com';
  password = 'AAAA1234';

  constructor(private userService: UserService, private router: Router) {
    this.userService.loginStatus.subscribe( value => {
      if (value === true) {
        this.router.navigate(['home']);
      }
    });
  }

  ngOnInit() {
  }

  login(form: NgForm) {
    const user = {
      email: form.value.email ,
      password: form.value.password ,
    };

    console.log(user);
    this.userService.userLogin(user);

    // TODO: check for user info correct
    if ( user.email === this.email && user.password === this.password ) {
      this.userService.userLogin(user);
    } else {
      console.log('Invalid user!');
    }
  }
    // if true call func below => to set user login so it will redirect to homepage

    // Alert ('Invalid email/password')
}
