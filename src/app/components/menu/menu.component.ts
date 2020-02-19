import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css' , './menu.component.scss' ]
})

export class MenuComponent implements OnInit {
  public sCurrentUser = JSON.parse(localStorage.getItem("User"));
  public bBusiness: boolean;
  public numeroNotificaciones:number = 3;
  public modalView:boolean =false;

  constructor() { }
  
  ngOnInit() {
    if(this.sCurrentUser.type != "technical"){
      this.bBusiness = true;
    }else{
      this.bBusiness = false;
    }
    console.log(this.sCurrentUser);
    setTimeout(function(){
      $('.alert').hide();
    },
    2000);
  }

  cerrarBienvenida(){
   this.modalView = true;
  }

}
