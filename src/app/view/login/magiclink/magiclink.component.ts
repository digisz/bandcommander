import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthenticationService } from './../../../services/authentication.service';

@Component({
  selector: 'app-magiclink',
  templateUrl: './magiclink.component.html',
  styleUrls: ['./magiclink.component.scss']
})
export class MagiclinkComponent implements OnInit {
  pageName =  'SMS Login' ;
  model: any = {};
  error = "";
  sent = false;
  constructor(
      private router: Router,
      private titleService: Title,
      private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.titleService.setTitle(this.pageName);
  }

  login() {
      this.authenticationService.magiclink(this.model.username)
          .subscribe(result => {
              if (result === true) {
                  // login successful
                  this.sent=true;
              } else {
                  // login failed
                  this.error = 'something went wrong';
                  this.sent = true;
              }
          });
  }

}
