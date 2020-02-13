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
  public userTechnical: boolean = true;
  public currentUrl: string;
  private mapUrlToSection = {
    "/menu": "Inicio",
    "/preciobase": "Esquema de Cálculo / Precio Base",
    "/precioventa": "Esquema de Cálculo / Precio Venta",
    "/sacceso": "Sequencia de Acesso",
    "/condicion": "Condicion",
  }
  public section: string;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    location: Location
  ) { }

  ngOnInit() {
    this._route.url.subscribe(url => {
      this.section = this.mapUrlToSection[location.pathname]
      if(location.pathname != "/login"){
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
    });
  }

  verifyUserLogin() {
    const user = localStorage.User ? JSON.parse(localStorage.User) : null
    if (user) {
      this.userTechnical = user.type == "technical" ? true : false
    }
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
