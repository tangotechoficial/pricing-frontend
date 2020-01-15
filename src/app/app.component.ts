import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'martins-project';
  public loggedIn: boolean;

  constructor(

    private _router: Router,
    private _route: ActivatedRoute,
    
  ) {}

  ngAfterViewInit(){
    
  }

}
