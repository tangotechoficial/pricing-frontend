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
    
  ) {}

  ngOnInit() {
    this._user = new User('', '', '');
  }

  onSubmit(){
    /* Login form request */
    console.log({_user: this._user})
    this._router.navigate(['/menu']);

  }
}
