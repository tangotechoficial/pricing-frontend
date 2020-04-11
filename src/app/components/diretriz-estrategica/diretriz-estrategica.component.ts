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
  public sum_VLRVNDFATLIQ: Number = 0;
  public sum_VLRMRGCRB: Number = 0;
  public sum_VLRMRGBRT: Number = 0;
  public sum_VLRRCTLIQAPU: Number = 0;
  public MRGCRB: Number = 0;
  public MRGBRT: Number = 0;

  // public Margem Contribuição Martins:



  constructor(
    private DiretrizesEstrategicasService: DiretrizesEstrategicasService,
  ) { }

  ngOnInit() {
    this.diretrizesEstrategicas = new Array<any>();
    this.DiretrizesEstrategicasService.diretrizesEstrategicas.subscribe(
      data => data.results.map(
        row => {
          this.diretrizesEstrategicas.push(row);
          this.sum_VLRVNDFATLIQ = (Number(this.sum_VLRVNDFATLIQ) + Number(row.VLRVNDFATLIQ))
          this.sum_VLRMRGCRB = (Number(this.sum_VLRMRGCRB) + Number(row.VLRMRGCRB))
          this.sum_VLRMRGBRT = (Number(this.sum_VLRMRGBRT) + Number(row.VLRMRGBRT))
          this.sum_VLRRCTLIQAPU = (Number(this.sum_VLRRCTLIQAPU) + Number(row.VLRRCTLIQAPU))
          this.MRGCRB =  (Number(this.sum_VLRMRGCRB)  / Number(this.sum_VLRRCTLIQAPU)) *100
          this.MRGBRT =  (Number(this.sum_VLRMRGBRT) / Number(this.sum_VLRRCTLIQAPU)) *100
        }
      ),
      error => console.log(error)
    );
  }

}
