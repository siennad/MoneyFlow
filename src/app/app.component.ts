import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MoneyFlow';

  public ngOnInit()
  {
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
}
