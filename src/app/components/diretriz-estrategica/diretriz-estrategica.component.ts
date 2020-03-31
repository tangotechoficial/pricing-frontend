import { Component, OnInit, ɵConsole } from '@angular/core';
import { DiretrizesEstrategicasService } from '../../services/diretrizes-estrategicas.service'
import { TechnicalMenuComponent } from '../navegacion/technical-menu/technical-menu.component';
import { timingSafeEqual } from 'crypto';
@Component({
  selector: 'app-diretriz-estrategica',
  templateUrl: './diretriz-estrategica.html',
  styleUrls: ['./diretriz-estrategica.component.scss'],
  providers: [ DiretrizesEstrategicasService ]
})
export class DiretrizEstrategicaComponent implements OnInit {

  public diretrizesEstrategicas: Array<any>;

  constructor(
    private DiretrizesEstrategicasService: DiretrizesEstrategicasService
  ) { }

  ngOnInit() {
    this.diretrizesEstrategicas = new Array<any>();
    this.DiretrizesEstrategicasService.diretrizesEstrategicas.subscribe(
      data => data.results.map(
        row => {
          this.diretrizesEstrategicas.push(row);
        }
      ),
      error => console.log(error)
    );
  }

}
