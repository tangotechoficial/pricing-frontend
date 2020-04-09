import { Deserializable } from '@app/interfaces'
export class PriceComposition implements Deserializable {
  url: string;
  codprd: any;
  desprd: string;
  abc: string;
  sensivel_rebate: any
  tipedereg: any;
  codedereg: any;
  codfilepd: any;
  codfilfat: any;
  mb: number;
  mb_calculada: number;
  verba_preco: number;
  fund_preco: number;
  rebate: number;
  icms: number;
  pis_cofins: number;
  devolucao: number;
  target: number;
  flex: number;
  cmv: any
  bonificado: number;
  complemento: number;
  precobase: number;
  data_preco: Date;
  codestuni: any;
  preco_livro: number;

  deserialize(data: any) {
    Object.assign(this, data);
    return this
  }
}
