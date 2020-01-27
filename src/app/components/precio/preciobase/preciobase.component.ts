import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'preciobase',
  templateUrl: './preciobase.component.html',
  styleUrls: ['../../precio/precio.component.css']
})
export class PrecioBaseComponent implements OnInit {
  isShow = false;

  constructor() { }

  ngOnInit() {
  }

  public goToSection() {
    //this._router.navigate(['/pbase']);
   this.isShow = !this.isShow;
  }

}
