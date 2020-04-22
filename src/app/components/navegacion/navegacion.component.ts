import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from '@services/authentication.service';

declare var $: any;

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'navegacion',
  templateUrl: './navegacion.component.html',
  animations: [
  trigger('ngIfAnimation', [
    transition(':enter, :leave', [ ])
  ]),



  trigger('easeInOut', [
    transition('void => *', [
        style({
            opacity: 0,
        }),
        animate('500ms ease-in', style({
            opacity: 1,
        }))
    ]),
    transition('* => void', [
        style({
            opacity: 1
        }),
        animate('500ms ease-in', style({
            opacity: 0
        }))
      ])
    ])
],

  styleUrls: ['./navegacion.component.scss']
})

export class NavegacionComponent implements OnInit {
  public isLoggedIn = false;
  public userTechnical = true;
  public currentUrl: string;
  public numNotif = 3 ;
  public numAprob = 1;
  public showBMenu = false;
  public showDetail = false;
  public section: string;

  @Output() navOutput = new EventEmitter<boolean>();
  private mapUrlToSection = {
    '/menu': 'Início',
    '/preciobase': 'Esquema de Cálculo / Preço Base',
    '/precioventa': 'Esquema de Cálculo / Preço Venda',
    '/simuladorvendas': 'Esquema de Calculo / Simulador vendas',
    '/sacceso': 'Sequência de acesso',
    '/condicion': 'Criar nova condição',
    '/datalab/dados-mestre': 'Growth Data Lab / Dados Mestres',
    '/datalab/diretriz-estrategica': 'Growth Data Lab / Diretriz Estratégica',
    '/datalab/plano-compras': 'Growth Data Lab / Plano de Compras',
    '/datalab/execucao': 'Growth Data Lab / Execução',
    '/datalab/simulador': 'Growth Data Lab / Simulador'
  }
  constructor(
    private authService: AuthenticationService,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    location: Location
  ) {}

  ngOnInit() {
    const user = this.authService.currentUserValue;
    this.userTechnical = user.groups.some( group => group.name === 'tecnico');
    this._route.url.subscribe(url => {
      this.section = this.mapUrlToSection[location.pathname];
      if (location.pathname !== '/login') {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
      console.log(this.isLoggedIn);
    });




  }

  notifyOpen() {
      $('#notificationPopUp').fadeToggle(400);
  }
  toggleDetail() {
    this.showDetail = !this.showDetail;

  }

  verificarNotif() {
    alert('verif');
  }

  triggerShowBMenu() {
    this.showBMenu = true;
    this.navOutput.emit(this.showBMenu);
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }

  /* ngDoCheck() {
    this.navOutput.next(this.cMode);
    if(!this.cMode){
      this.section = "Alterar condição";
    }else{
      this.section = "Criar nova condição";
    }
  } */

}
