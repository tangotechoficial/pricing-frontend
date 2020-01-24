import { Component, OnInit } from '@angular/core';
import { Sacceso } from '../../models/sacceso';

@Component({
  selector: 'sacceso',
  templateUrl: './sacceso.component.html',
  styleUrls: ['./sacceso.component.css']
})
export class SaccesoComponent implements OnInit {
  public _sacceso: Sacceso;
  public aProperties: Array<any>;
  constructor(){}

  ngOnInit() {
    this._sacceso = new Sacceso('', 'SQ001', '');
  }

  public setDescripcion(){
    var sDescricao = '';
    this.aProperties = ['Clientes', 'CantidadeVendas'];
    var aDescricao: Array<any> = new Array<any>();

    //Check empty positions
    this.aProperties.forEach(element => {
        if(element != ''){
            aDescricao.push(element);
        }
    });

    //Create Descripcion
    aDescricao.forEach(element =>{
      sDescricao = sDescricao + '/' + element;
    })
    console.log(sDescricao);
    this._sacceso.sSeqAcceso = sDescricao;
    this.aProperties = [];
};

}