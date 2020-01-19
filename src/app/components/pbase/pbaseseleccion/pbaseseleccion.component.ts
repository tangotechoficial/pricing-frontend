import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-pbaseseleccion',
  templateUrl: './pbaseseleccion.component.html',
  styleUrls: ['./pbaseseleccion.component.css']
})
export class PbaseseleccionComponent implements OnInit {

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  public goToPbase() {
    this._router.navigate(['/pbase']);
  }

}
