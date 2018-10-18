import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'MoneyFlow';
  loading;

  constructor( private router: Router) {
    this.loading = true;
  }

  public ngOnInit() {
    $(document).ready(function() {
      $('button.openbtn').on('click', function() {
        $('#mySidebar').css('width', '250px');
        $('#main').css('margin-left', '250px');
      });
    });

    $(document).ready(function() {
      $('a.closebtn').on('click', function() {
        $('#mySidebar').css('width', '0px');
        $('#main').css('margin-left', '');
        return false;
      });
    });
  }

  ngAfterViewInit() {
    this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationStart) {
                    this.loading = true;
                } else if ( event instanceof NavigationEnd ||
                    event instanceof NavigationCancel
                    ) {
                    this.loading = false;
                }
            });
  }
}
