import { Component, OnInit } from '@angular/core';
import { SaccesoService } from '../../../services/sacceso.service';
import { Sequencia } from '../../../models/sequencia';

@Component({
  selector: 'app-preciobbase',
  templateUrl: './preciobbase.component.html',
  styleUrls: ["../../precio/precio.component.scss"],
  providers: [SaccesoService]
})
export class PreciobbaseComponent implements OnInit {
  isShow = false;
  existNegocios: string;
  existVentas: string;
  sequencias: Sequencia[] = [];
  selectedSequencia: Sequencia;

  constructor(private readonly saccesoService: SaccesoService) {
  }

  ngOnInit() {
    this.saccesoService.getSequencias().subscribe((sequencias: Sequencia[]) => {
      this.sequencias = sequencias;
    });
  }

  public goToSection() {
   this.isShow = !this.isShow;
  }

  parentListener($event: string) {
    this.existNegocios = $event;
  }

  parentListenerTwo($event: string) {
    this.existVentas = $event;
  }

  getSelectedSequencia(sequenciaValue: Sequencia): void {
    this.selectedSequencia = sequenciaValue;
  }
}
