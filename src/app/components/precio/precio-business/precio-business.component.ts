import { Component } from '@angular/core';

@Component({
  selector: 'precio-business',
  templateUrl: './precio-business.component.html',
  styleUrls: ['../../precio/precio.component.scss']
})
export class PrecioBusiness {
  public sequencias;
  public selectedSequencia;
  ngOnInit() {
  }

  getSelectedSequencia(val: any){}

 
}

