import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public sCurrentUser = JSON.parse(localStorage.getItem("User"));
  constructor() { }
  
  ngOnInit() {
    console.log(this.sCurrentUser);
    setTimeout(function(){
      $('.alert').hide();
    },
    2000);
  }

}
