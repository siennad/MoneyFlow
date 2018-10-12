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
  

  constructor(private userService: UserService, private router: Router) { 
    this.userService.loginStatus.subscribe( value => {
      if (value == true) {
        this.router.navigate(['home'])
      }
    })
  }

  ngOnInit() {
  }

  login(form: NgForm) {
    // TODO: check for user info correct
    // if true call func below => to set user login so it will redirect to homepage
    this.userService.userLogin();
    // If false
    // Alert ('Invalid email/password')
  }  

}
