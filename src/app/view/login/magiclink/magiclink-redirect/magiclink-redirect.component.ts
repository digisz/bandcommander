import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../../../services/authentication.service';



@Component({
  selector: 'app-magiclink-redirect',
  templateUrl: './magiclink-redirect.component.html',
  styleUrls: ['./magiclink-redirect.component.scss']
})
export class MagiclinkRedirectComponent implements OnInit {
  model: any = {};
  error: String;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.login()
  }

  login() {
    this.route.params.forEach((params: Params) => {
      this.model = {
        name: params['user'],
        password: params['token'],
        type:'magiclink'
      };
    });

      this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(result => {
              if (result === true) {
                  // login successful
                  this.router.navigate(['/']);
              } else {
                  // login failed
                  this.error = 'Username or password is incorrect';
              }
          });
  }

}
