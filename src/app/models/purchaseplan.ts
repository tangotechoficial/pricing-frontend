import { Deserializable } from '@app/interfaces';

export class PurchasePlan implements Deserializable {
  codprd: number;
  codfilemp: number;
  codfilfat: number;
  data_preco: Date;
  codestuni: number;
  meta_venda_sugerido: number;
  meta_venda_planejado: number;
  preco_venda_liquido_sugerido: number;
  preco_venda_liquido_planejado: number;
  competitividade_sugerido: number;
  competitividade_planejado: number;
  preco_venda_bruta_sugerido: number;
  preco_venda_bruta_planejado: number;
  preco_base_sugerido: number;
  preco_base_planejado: number;
  rebate_planejado: number;
  funding_planejado: number;
  verba_planejado: number;
  margem_bruta_planejado: number;
  cmv_sugerido: number;
  cmv_planejado: number;
  sensivel_rebate: string;

  deserialize(data: any) {
    Object.assign(this, data);
    return this
  }

}
