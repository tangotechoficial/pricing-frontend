import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  isShowMenu = false;
  private token: string;
  public sCurrentUser: any;
  public bBusiness: boolean;
  public numTotNotif = 3;
  public modalView = false;

  constructor(private authenticationService: AuthenticationService) { }

  private setUserInfo() {
    try {
       console.log(this.authenticationService.currentUserValue);
       return JSON.parse(this.authenticationService.currentUserValue);
    } catch ( Error ) {
        return {
          username: 'Guest'
        };
    }
  }

  ngOnInit() {
    this.token = this.authenticationService.currentTokenValue;
    this.sCurrentUser = this.setUserInfo();
    this.bBusiness = this.sCurrentUser.groups[0].name === 'business' ? true : false;
    console.log(this.bBusiness);

    setTimeout(() => {
      $('.alert').hide();
    },
    2000);
  }

  closeWelcome() {
   this.modalView = true;
  }
}
