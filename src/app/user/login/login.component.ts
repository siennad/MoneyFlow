import { ExpenseService } from './../../services/expense.service';
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

  constructor(private userService: UserService, private router: Router, private expenseService: ExpenseService) {
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

    this.userService.verifyUser(user);
    this.expenseService.getBudgetValue();
  }
}
