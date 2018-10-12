import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginStatus;
  constructor( private userService: UserService ) { 
    this.userService.loginStatus.subscribe( value => {
      this.loginStatus = value;
    })
  }

  ngOnInit() {}

}
