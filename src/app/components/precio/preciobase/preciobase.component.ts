import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'preciobase',
  templateUrl: './preciobase.component.html',
  styleUrls: ['../../precio/precio.component.scss']
})
export class PrecioBaseComponent implements OnInit {
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
