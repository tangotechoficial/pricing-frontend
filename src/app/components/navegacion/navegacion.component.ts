import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from "@angular/common";
import {BrowserModule} from '@angular/platform-browser'

declare var $: any;

import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  animateChild
} from '@angular/animations';

@Component({
  selector: 'navegacion',
  templateUrl: './navegacion.component.html',
  animations: [
  trigger('ngIfAnimation', [
    transition(':enter, :leave', [
      query('@*', animateChild(), { optional: true })
    ])
  ]),

  trigger('easeInOut', [
    transition('void => *', [
        style({
            opacity: 0,
        }),
        animate("500ms ease-in", style({
            opacity: 1,
        }))
    ]),
    transition('* => void', [
        style({
            opacity: 1
        }),
        animate("500ms ease-in", style({
            opacity: 0
        }))
      ])
    ])
],

  styleUrls: ['./navegacion.component.css' , './navegacion.component.scss']
})

export class NavegacionComponent implements OnInit {
  public isLoggedIn: boolean = false
  public userTechnical: boolean = true;
  public currentUrl: string;
  public numNotif:number = 3 ;
  public numAprob:number = 1;
  public showBMenu: boolean = false;

  public showDetail:boolean = false;

  private mapUrlToSection = {
    "/menu": "Inicio",
    "/preciobase": "Esquema de Cálculo / Precio Base",
    "/precioventa": "Esquema de Cálculo / Precio Venta",
    "/sacceso": "Sequência de acesso",
    "/condicion": "Condicion",
  }
  public section: string;
  @Output() navOutput = new EventEmitter<boolean>()
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    location: Location
  ) { }

  ngOnInit() {
    // const user = JSON.parse(localStorage.User);
    // this.userTechnical = user.type == "technical" ? true : false;
    this._route.url.subscribe(url => {
      this.section = this.mapUrlToSection[location.pathname]
      if(location.pathname != "/login"){
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
    })
  }

  notifyOpen(){
      $("#notificationPopUp").fadeToggle(400);
  }
  toggleDetail(){
    this.showDetail = !this.showDetail;

  }

  verificarNotif(){
    alert("verif")
  }

  triggerShowBMenu() {
    this.showBMenu = true;
    this.navOutput.emit(this.showBMenu)
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
