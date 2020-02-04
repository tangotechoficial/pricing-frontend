/* Libraries */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { User } from './../../models/user';
import { LoginService } from './../../services/login.service';
import { Global } from './../../services/global';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})

/* Class definition */
export class LoginComponent implements OnInit {
  public _user: User;
  public _BP: boolean = false;
  public _BU: boolean = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _loginService: LoginService
  ) { }

  ngOnInit() {
    this._user = new User();
  }
 onSubmit(form) {
    this._loginService.login(this._user)
      .subscribe(
        response => {
          console.log(response);
          //var user = response.user;
          //this._user = new User(user.sEmail, user.sPassword, user.sName, user.sToken, user.sType, user.bLoggedIn, user.sUser_id, user.iAdmin_p);
          this._router.navigate(['/menu']);
          localStorage.setItem("User", JSON.stringify(this._user));
        },
        error => {
          switch(error.error.error){
            case 'BAD PASSWORD':
              this._BP = true;
              this._BU = false;
              break;
            case 'AUTH FAILED':
              this._BP = false;
              this._BU = true;
              break;
          }
          
        }
      );

  }
}
