import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  public isLoggedIn: boolean = false
  public currentUrl: string;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    location: Location
  ) { }

  ngOnInit() {
    this._route.url.subscribe(url => {
      console.log(location);
      if(location.pathname != "/login"){
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
    });
    
  }

/*   ngDoCheck() {
    this._route.url.subscribe(url => {
      console.log(location)
      if(url[0].path != ""){
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
    });
  }

  ngAfterContentInit() {
    this._route.url.subscribe(url => {
      console.log(url[0])
      if(url[0].path != ""){
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
    });
  } */


}
