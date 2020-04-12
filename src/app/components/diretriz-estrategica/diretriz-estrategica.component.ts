import { DiretrixDataManagerService } from '@services/diretrix-datamanager.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FilterModalService } from '@services/filtermodal.service';
import { Component, OnInit, OnChanges, ChangeDetectorRef, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DiretrizesEstrategicasService } from '../../services/diretrizes-estrategicas.service';
import { Diretrix } from '@models/diretrix';
import { Filter } from '@models/filter';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-diretriz-estrategica',
  templateUrl: './diretriz-estrategica.html',
  styleUrls: ['./diretriz-estrategica.component.scss'],
  providers: [ DiretrizesEstrategicasService ]
})
export class DiretrizEstrategicaComponent implements OnInit, OnChanges,OnDestroy {

  filterForm: FormGroup;
  filter: Filter = new Filter();

  public diretrizesEstrategicas: Diretrix[];
  public directories: any;
  public groups: any;
  public categories: any;
  public subCategories: any;
  public fornecedores: any;
  public filial: any;

  public sumVLRVNDFATLIQ: number;
  public sumVLRMRGCRB: number;
  public sumVLRMRGBRT: number;
  public sumVLRRCTLIQAPU: number;
  public MRGCRB: number;
  public MRGBRT: number;


  /**
   *
   */

  constructor(
    private diretrixService: DiretrizesEstrategicasService,
    private diretrixDataManager: DiretrixDataManagerService,
    private formBuilder: FormBuilder,
    private filterService: FilterModalService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef

  ) {

    this.filter = this.filterService.currentFilterValue;
    this.diretrizesEstrategicas = this.diretrixDataManager.currentDiretrixValue;
  }

  private calculateIndicators(source) {
    this.sumVLRVNDFATLIQ = 0;
    this.sumVLRMRGCRB = 0;
    this.sumVLRMRGBRT = 0;
    this.sumVLRRCTLIQAPU = 0;
    this.MRGCRB = 0;
    this.MRGBRT = 0;
    this.sumVLRVNDFATLIQ = (Number(this.sumVLRVNDFATLIQ) + Number(source.VLRVNDFATLIQ));
    this.sumVLRMRGCRB = (Number(this.sumVLRMRGCRB) + Number(source.VLRMRGCRB));
    this.sumVLRMRGBRT = (Number(this.sumVLRMRGBRT) + Number(source.VLRMRGBRT));
    this.sumVLRRCTLIQAPU = (Number(this.sumVLRRCTLIQAPU) + Number(source.VLRRCTLIQAPU));
    this.MRGCRB =  (Number(this.sumVLRMRGCRB)  / Number(this.sumVLRRCTLIQAPU)) * 100;
    this.MRGBRT =  (Number(this.sumVLRMRGBRT) / Number(this.sumVLRRCTLIQAPU)) * 100;
  }
  ngOnInit() {

    this.filterForm = this.formBuilder.group({
      desdrtcllatu: [''],
      codgrpmer: [''],
      codfmlmer: [''],
      codclsmer: [''],
      coddivfrn: [''],
      codestuni: [''],
    })
    this.spinner.show()
    this.filterService.filterCurrent.pipe(untilDestroyed(this)).subscribe(filter => {this.filter = filter;});
    this.diretrixDataManager.actualDiretrixData
    .pipe(untilDestroyed(this))
    .subscribe(
      diretrixes => this.diretrizesEstrategicas = diretrixes
    );
    const dataArray: Diretrix[] = [];
    Promise.all([
      this.diretrixService.diretrizesEstrategicas.then(
        data => data.map(
          row => {
            dataArray.push(row);
            this.calculateIndicators(row);
          }
        )
      )
      .catch(error => console.error(error)),
      this.diretrixService.getDirectories().then(directories => {this.directories = directories; })
    ]).then( result => {
      this.diretrixDataManager.setData(dataArray);
      this.cdr.markForCheck();
      this.spinner.hide();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.cdr.detectChanges()
  }

  ngOnDestroy() {

  }

  resetFilter() {
    this.filterForm.reset();
    this.spinner.show();
    this.diretrixService.diretrizesEstrategicas
    .then((result) => {
        this.diretrixDataManager.setData(result);
        result.map(row => this.calculateIndicators(row));
        this.spinner.hide();
      });
  }

  loadGroups(value){
    this.spinner.show()
    return this.diretrixService.getGroups(value.currentTarget.value)
    .then( groups => { this.groups = groups; this.spinner.hide(); } );
  }
  loadCategories(value) {
    this.spinner.show();
    return this.diretrixService.getCategories(value.currentTarget.value)
    .then(categories => {this.categories = categories; this.spinner.hide();
    } );
  }

  loadSubCategories(value) {
    this.spinner.show();
    return this.diretrixService.getSubCategories(value.currentTarget.value)
    .then(subCategories => {this.subCategories = subCategories; this.spinner.hide();
    });
  }

  loadFornecedor(value) {
    this.spinner.show();
    return this.diretrixService.getFornecedores(value.currentTarget.value).
    then(fornecedores => {this.fornecedores = fornecedores; this.spinner.hide();
    });
  }
  loadUF(value) {
    this.spinner.show();
    return this.diretrixService.getFiliais(value.currentTarget.value).then(filial => {this.filial = filial;this.spinner.hide(); })
  }

  setFilter() {
    this.spinner.show()
    this.diretrixService.getFilteredData(this.filterForm.value)
      .then((result) => {
        this.diretrixDataManager.setData(result)
        result.map(row => this.calculateIndicators(row))
        this.spinner.hide()
      });
  }
}
