import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';
import {jwt_decode } from 'jwt-decode';
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css' , './menu.component.scss' ]
})

export class MenuComponent implements OnInit {
  isShowMenu = false;
  private token: string;
  public sCurrentUser: any;
  public bBusiness: boolean;
  public numTotNotif:number = 3;
  public modalView:boolean = false;

  constructor(private authenticationService: AuthenticationService) { }

  private setUserInfo() {
    try{
       return JSON.parse(jwt_decode(this.token));
    } catch( Error ) {
        return {
          username: 'Guest'
        }
    }
  }

  ngOnInit() {
    this.token = this.authenticationService.currentTokenValue;
    this.sCurrentUser = this.setUserInfo()

    // if(this.sCurrentUser.type !== "technical"){
    //   this.bBusiness = true;
    // }else{
    //   this.bBusiness = false;
    // }
    setTimeout(function(){
      $('.alert').hide();
    },
    2000);
  }

  closeWelcome(){
   this.modalView = true;
  }



}
