/* Libraries */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService } from '@services/authentication.service';
import { environment } from '@env/environment';
import { first } from 'rxjs/operators';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/* Class definition */
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
    if(this.authenticationService.currentTokenValue) {
      this._router.navigate(['/menu'])
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    const paramKey = 'returnUrl';
    this.returnUrl = this._route.snapshot.queryParams[paramKey] || '/';
  }

  get form() {
    return this.loginForm.controls;
  }
 onSubmit() {
   this.submitted = true;

   if(this.loginForm.invalid) {
     return true
   }

   this.authenticationService.login(this.form.email.value, this.form.password.value).pipe(first())
   .subscribe(
     data => {
       this._router.navigate([this.returnUrl]);
     },
     error => {
       console.log(error);
     }
   )
  }
}
