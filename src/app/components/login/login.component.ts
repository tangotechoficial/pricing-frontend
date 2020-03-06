/* Libraries */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { User } from './../../models/user';
import { LoginService } from './../../services/login.service';
import { Global } from './../../services/global';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})

/* Class definition */
export class LoginComponent implements OnInit {
  public _user: User;
  public _BL: boolean = false;
  public _SE: boolean = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _loginService: LoginService
  ) { }

  ngOnInit() {
    this._user = new User();
  }
 onSubmit() {
    if(this._user.email == "suzi.campahna@tangotech.com.br"){
      this._user = new User("suzi.campahna@tangotech.com.br", "12345678", "Suzi Campahna", "Token", "technical", true, "103", 1);
    }else{
      this._user = new User("ana.senko@tangotech.com.br", "12345678", "Ana Senko", "Token", "business", true, "103", 1);
    }
    this._router.navigate(['/menu']);
    localStorage.setItem("User", JSON.stringify(this._user));
     /* this._loginService.login(this._user)
      .subscribe(
        response => {
          var user = response.user;
          this._user = new User(user.sEmail, user.sPassword, user.sName, user.sToken, user.sType, user.bLoggedIn, user.sUser_id, user.iAdmin_p);
          this._router.navigate(['/menu']);
          localStorage.setItem("User", JSON.stringify(this._user));
        },
        error => {
          switch(error.status){
            case 401:
              this._BL = true;
              this._SE = false;
              break;
            default:
              this._BL = false;
              this._SE = true;
              break;
          }
          
        }
      ); */
  }
}
