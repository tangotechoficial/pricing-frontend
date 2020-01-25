/* Libraries */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

/* Models */
import { User } from '../../models/user';

/* Component configuration */
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/* Class definition */
export class LoginComponent implements OnInit {
  public _user: User;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this._user = new User('', '');
  }

  onSubmit() {
    var that = this;
    /* Login form request */
    console.log(this._user.email)
    this.onLogin(this._user.email, this._user.password)
      .then((data)=>{
        that._router.navigate(['/menu']);
      })
  }

  onLogin(email, password) {
    return new Promise((resolve, reject) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("email", email);
      urlencoded.append("password", password);

      fetch("http://ec2-3-81-212-95.compute-1.amazonaws.com/api/login", {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      })
      .then(response => response.text())
      .then(result => resolve(result))
      .catch(error => reject(error));

    })
  }
}
