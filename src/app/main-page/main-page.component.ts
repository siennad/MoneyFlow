import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
    this.userService.loginStatus.subscribe( value => {
      console.log(value);
      if (value !== true) {
        this.router.navigate(['login']);
      }
    });
  }
  
  ngOnInit() {
    console.log(this.exampleFunc(1,2));
  }
  
  exampleFunc(a, b) {
    return a+b
  }

}
