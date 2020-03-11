import { Component, OnInit, Input } from '@angular/core';
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
  filterModel: Filter = new Filter();

  //some fake Data
  filterData = {
    line: ['abb', 'hbl', 'tei', 'mtc'],
    fe: [1, 41, 52, 64, 462],
    uf: ['sc', 'rj', 'mg', 'sp', 'ba'],
    category: ['atomatados', 'bolachas e biscoitos', 'café', 'doces', 'destilados'],
    subCategory: [
      'doces cremosos',
      'doces em calda',
      'achocolatados',
      'balas',
      'tortas'
    ],
    provider: [
      'pepsico brasil ltda',
      'nestlé - garoto',
      'pandurata alimentos-lac',
      'hero brasil s/a',
      'unilever bestfood-bas'
    ],
    material: [
      'nescau ball actig.45x350g',
      'nesquick actig 45x350g',
      'leite ninho actig.30x400g',
      'nescau 2.0 actig.30400g'
    ]
  }
  constructor(
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      line: [null],
      category: [null],
      subCategory: [null],
      provider: [null],
      fe: [null],
      uf: [null],
      material: [null],
    })
  }

  reset() {
    this.filterModel = new Filter();
  }

  submit() {
    //pass filterModel to filterService and DataProviderService instance
    $('#modalFilter').modal('hide')
  }

}
