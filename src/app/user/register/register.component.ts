import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private userService: UserService) { }

  ngOnInit() {
  }

  signup(form: NgForm) {
    const newUser = {
      name : form.value.name,
      email : form.value.email,
      password : form.value.password
    };

    this.userService.addUser(newUser)
      .subscribe( user => {
        if (user.success) {
          this.userService.loginStatus.next(true);
        }
      });

  }


}
