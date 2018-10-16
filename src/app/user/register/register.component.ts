import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private userService: UserService, private router: Router) {
    this.userService.loginStatus.subscribe( value => {
      if (value === true) {
        this.router.navigate(['home']);
      }
    });

  }

  ngOnInit() {
  }

  signup(form: NgForm) {
    const newUser = {
      name : form.value.name,
      email : form.value.email,
      password : form.value.password
    };

    this.userService.addUser(newUser)
      .subscribe( res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.userService.loginStatus.next(true);
      },
      err => {
        console.log(err);
      });

  }


}
