import { Deserializable } from '@app/interfaces';

export class PurchasePlan implements Deserializable {
  codprd: number;
  codfilemp: number;
  codfilfat: number;
  week: string;
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
  custos_sugerido: number;
  custos_planejado: number;
  icms_sugerido: number;
  pis_cofins_sugerido: number;
  ipi_sugerido: number
  st_sugerido: number
  icms_planejado: number;
  pis_cofins_planejado: number;
  ipi_planejado: number
  st_planejado: number
  operacional_devolucao_sugerido: number;
  operacional_devolucao_planejado: number;
  operacional_logistica_sugerido: number;
  operacional_logistica_planejado: number;
  preco_base_sugerido: number;
  preco_base_planejado: number;
  rebate_sugerido: number;
  rebate_planejado: number;
  bonificacao_sugerido: number=0;
  bonificacao_planejado: number=0;
  funding_planejado: number;
  verba_planejado: number;
  verba_sugerido: number;
  verba_especie_sugerido: any;
  verba_especie_planejado: any;
  margem_bruta_planejado: number;
  cmv_sugerido: number;
  cmv_planejado: number;
  sensivel_rebate: string;

  deserialize(data: any) {
    Object.assign(this, data);
    return this
  }

}
