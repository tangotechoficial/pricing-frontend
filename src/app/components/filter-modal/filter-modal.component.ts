import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Filter} from '@models/filter'
// jQuery
declare var $: any;

@Component({
  selector: 'filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.css']
})
export class FilterModalComponent implements OnInit {

  filterForm: FormGroup;
  filter: Filter = new Filter();
  filterParentScreen: string = "";
  @Output('update') outputFilter: EventEmitter<Filter> = new EventEmitter<Filter>();
  categories: any[] = []
  subCats: any[] = []
  providers: any[] = []
  branches: any[] = []
  ufList: any[] = []
  materials: any[] = []

  filterData = {
        business_line: ['abb', 'hbl', 'tei', 'mtc'],
        category: {
          abb: [
            'atomatados',
            'bolachas e biscoitos',
            'café',
            'doces' ,
            'destilados'
          ]
        },
        subCategory: {
          abb: {
            doces: [
                'doces cremosos',
                'doces em calda',
                'achocolatados',
                'balas',
                'tortas'
            ],
          }
        },
        provider: {
          abb :{
            doces: {
              achocolatados: [
                'pepsico brasil ltda',
                'nestlé - garoto',
                'pandurata alimentos-lac',
                'hero brasil s/a',
                'unilever bestfood-bas'
              ]
            }
          }
        },
        expedition_branch: {
          abb: {
            doces: {
              achocolatados: {
                "nestlé - garoto": [1, 41, 52, 64, 462]
              }
            }
          }
        },
        uf: {
          abb:{
            doces:{
              achocolatados:{
                "nestlé - garoto": {
                  "1":['sc', 'rj', 'mg', 'sp', 'ba']
                }
              }
            }
          }
        },
        material: {
          abb: {
            doces: {
              achocolatados:{
              "nestlé - garoto": {
                "1": {
                  'sp': [
                    'nescau ball actig.45x350g',
                    'nesquick actig 45x350g',
                    'leite ninho actig.30x400g',
                    'nescau 2.0 actibootsg.30400g'
                  ]
                }
              }
            }
          }
        }
      }
    }

  constructor(
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {

    this.filterForm = this.formBuilder.group({
      linha_negocio: [Validators.required],
      descgrpprd: [Validators.required],
      desctgprd: [Validators.required],
      desdivfrn: [Validators.required],
      codfilemp: [Validators.required],
      codestuni: [Validators.required],
      desprd: [Validators.required]
    })
  }

  private get form() {
    return this.filterForm;
  }

  resetSelects() {
    this.categories = []
    this.subCats = []
    this.providers = []
    this.branches = []
    this.ufList = []
    this.materials = []
  }

  reset() {
    this.filter = new Filter();
    this.outputFilter.emit(this.filter)
    this.resetSelects()
  }

  loadCategory() {
    this.categories = this.filterData['category'][this.filter.linha_negocio]
  }
  loadSubCategory() {
    this.subCats = this.filterData['subCategory'][this.filter.linha_negocio][this.filter.descgrpprd]
  }
  loadProvider() {
    this.providers = this.filterData['provider'][this.filter.linha_negocio][this.filter.descgrpprd][this.filter.desctgprd]
  }
  loadBranches() {
    this.branches = this.filterData['expedition_branch'][this.filter.linha_negocio][this.filter.descgrpprd][this.filter.desctgprd][this.filter.desdivfrn]
  }
  loadUFDest() {
    this.ufList = this.filterData['uf'][this.filter.linha_negocio][this.filter.descgrpprd][this.filter.desctgprd][this.filter.desdivfrn][this.filter.codfilemp]
  }
  loadMaterials() {
    this.materials = this.filterData['material'][this.filter.linha_negocio][this.filter.descgrpprd][this.filter.desctgprd][this.filter.desdivfrn][this.filter.codfilemp][this.filter.codestuni]
  }


  submit() {
    this.filter.deserialize(this.form.value);
    this.outputFilter.emit(this.filter);
    $('#modalFilter').modal('hide')
  }

}
