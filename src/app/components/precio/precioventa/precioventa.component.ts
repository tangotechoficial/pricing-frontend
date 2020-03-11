import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'precioventa',
  templateUrl: './precioventa.component.html',
  styleUrls: ['../../precio/precio.component.scss']
})
export class PrecioVentaComponent implements OnInit {
  public sCurrentUser = JSON.parse(localStorage.getItem("User"));
  public bBusiness: boolean;

  constructor() { }

  ngOnInit() {
    if(this.sCurrentUser.type !== "technical"){
      this.bBusiness = true;
    }else{
      this.bBusiness = false;
    }
  }
  
}
