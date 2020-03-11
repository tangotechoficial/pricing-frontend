import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'popupmenu',
  templateUrl: './popupmenu.component.html',
  styleUrls: ['./popupmenu.component.scss']
})
export class PopupmenuComponent implements OnInit {
public references:Array<any>;

  constructor() { }

  ngOnInit() {
  	this.references = [{"cond": "TCMV" , "des":"CMV"} , {"cond": "TICM" , "des":"ICMS"} , {"cond": "TBCN" , "des":"Beneficio customizabel"}]
  	console.log(this.references)
  }


}
