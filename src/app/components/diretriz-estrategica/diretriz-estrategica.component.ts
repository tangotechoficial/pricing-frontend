import { Component, OnInit } from '@angular/core';
import { DiretrizesEstrategicasService } from '../../services/diretrizes-estrategicas.service'
@Component({
  selector: 'app-diretriz-estrategica',
  templateUrl: './diretriz-estrategica.html',
  styleUrls: ['./diretriz-estrategica.component.scss'],
  providers: [ DiretrizesEstrategicasService ] 
})
export class DiretrizEstrategicaComponent implements OnInit {

  diretrizesEstrategicas: Array<any>;

  constructor(
    private DiretrizesEstrategicasService: DiretrizesEstrategicasService
  ) { }

  ngOnInit() {
    this.diretrizesEstrategicas = Array<any>();
    this.DiretrizesEstrategicasService.listar().subscribe(res => this.diretrizesEstrategicas = res)
    console.log(this.diretrizesEstrategicas)
  }

}
