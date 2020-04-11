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
  public sumVLRVNDFATLIQ = 0;
  public sumVLRMRGCRB = 0;
  public sumVLRMRGBRT = 0;
  public sumVLRRCTLIQAPU = 0;
  public MRGCRB = 0;
  public MRGBRT = 0;

  // public Margem Contribuição Martins:



  constructor(
    private diretrixService: DiretrizesEstrategicasService,
  ) { }

  ngOnInit() {
    this.diretrizesEstrategicas = new Array<any>();
    this.diretrixService.diretrizesEstrategicas.then(
      data => data.map(
        row => {
          this.diretrizesEstrategicas.push(row);
          this.sumVLRVNDFATLIQ = (Number(this.sumVLRVNDFATLIQ) + Number(row.VLRVNDFATLIQ));
          this.sumVLRMRGCRB = (Number(this.sumVLRMRGCRB) + Number(row.VLRMRGCRB));
          this.sumVLRMRGBRT = (Number(this.sumVLRMRGBRT) + Number(row.VLRMRGBRT));
          this.sumVLRRCTLIQAPU = (Number(this.sumVLRRCTLIQAPU) + Number(row.VLRRCTLIQAPU));
          this.MRGCRB =  (Number(this.sumVLRMRGCRB)  / Number(this.sumVLRRCTLIQAPU)) *100;
          this.MRGBRT =  (Number(this.sumVLRMRGBRT) / Number(this.sumVLRRCTLIQAPU)) *100;
        }
      )
    )
    .catch(error => console.error(error));
  }

  loadGroups(){
    return;
  }
}
