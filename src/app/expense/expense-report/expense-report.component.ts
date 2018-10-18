import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.css']
})
export class ExpenseReportComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
    this.userService.loginStatus.subscribe( value => {
      console.log(value);
      if (value !== true) {
        this.router.navigate(['login']);
      }
    });
  }

  ngOnInit() {
  }

}
