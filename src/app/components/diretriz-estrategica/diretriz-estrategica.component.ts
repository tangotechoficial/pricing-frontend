import { NgxSpinnerService } from 'ngx-spinner';
import { FilterModalService } from '@services/filtermodal.service';
import { Component, OnInit, OnChanges, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DiretrizesEstrategicasService } from '../../services/diretrizes-estrategicas.service';
import { TechnicalMenuComponent } from '../navegacion/technical-menu/technical-menu.component';
import { timingSafeEqual } from 'crypto';
import { Diretrix } from '@models/diretrix';
import { Filter } from '@models/filter';

@Component({
  selector: 'app-diretriz-estrategica',
  templateUrl: './diretriz-estrategica.html',
  styleUrls: ['./diretriz-estrategica.component.scss'],
  providers: [ DiretrizesEstrategicasService ]
})
export class DiretrizEstrategicaComponent implements OnInit, OnChanges {

  filterForm: FormGroup;
  filter: Filter = new Filter();

  public diretrizesEstrategicas: Array<any>;
  public directories: any;
  public groups: any;
  public categories: any;
  public subCategories: any;
  public fornecedores: any;
  public filial: any;

  public sumVLRVNDFATLIQ = 0;
  public sumVLRMRGCRB = 0;
  public sumVLRMRGBRT = 0;
  public sumVLRRCTLIQAPU = 0;
  public MRGCRB = 0;
  public MRGBRT = 0;


  constructor(
    private diretrixService: DiretrizesEstrategicasService,
    private formBuilder: FormBuilder,
    private filterService: FilterModalService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.diretrizesEstrategicas = new Array<any>();
    this.filterForm = this.formBuilder.group({
      codfilfat: [Validators.required],
      codfilepd: [Validators.required],
      codestuni: [Validators.required],
      codprd: [Validators.required]
    })
    Promise.all([
      this.diretrixService.diretrizesEstrategicas.then(
        data => data.map(
          row => {
            this.diretrizesEstrategicas.push(row);
            this.sumVLRVNDFATLIQ = (Number(this.sumVLRVNDFATLIQ) + Number(row.VLRVNDFATLIQ));
            this.sumVLRMRGCRB = (Number(this.sumVLRMRGCRB) + Number(row.VLRMRGCRB));
            this.sumVLRMRGBRT = (Number(this.sumVLRMRGBRT) + Number(row.VLRMRGBRT));
            this.sumVLRRCTLIQAPU = (Number(this.sumVLRRCTLIQAPU) + Number(row.VLRRCTLIQAPU));
            this.MRGCRB =  (Number(this.sumVLRMRGCRB)  / Number(this.sumVLRRCTLIQAPU)) * 100;
            this.MRGBRT =  (Number(this.sumVLRMRGBRT) / Number(this.sumVLRRCTLIQAPU)) * 100;
          }
        )
      )
      .catch(error => console.error(error)),
      this.diretrixService.getDirectories().then(directories => {this.directories = directories;})
    ]);
  }

  ngOnChanges(changes: SimpleChanges) {

  }


  loadGroups(value){
    return this.diretrixService.getGroups(value.currentTarget.value).then( groups => { this.groups = groups; } );
  }
  loadCategories(value) {
    return this.diretrixService.getCategories(value.currentTarget.value).then(categories => {this.categories = categories;} );
  }

  loadSubCategories(value) {
    return this.diretrixService.getSubCategories(value.currentTarget.value).then(subCategories => {this.subCategories = subCategories;})
  }

  loadFornecedor(value) {
      return this.diretrixService.getFornecedores(value.currentTarget.value).then(fornecedores => {this.fornecedores = fornecedores;})
  }
  loadUF(value) {
      return this.diretrixService.getFiliais(value.currentTarget.value).then(filial => this.filial = filial)
  }
}
