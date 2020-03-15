import { Deserializable } from '@app/interfaces';

export class PurchasePlan implements Deserializable {
  codprd: number = 0;
  codfilemp: number = 0;
  codfilfat: number = 0;
  data_preco: Date;
  codestuni: number = 0;
  meta_venda_sugerido: number = 0;
  meta_venda_planejado: number = 0;
  preco_venda_liquido_sugerido: number = 0;
  preco_venda_liquido_planejado: number = 0;
  competitividade_sugerido: number = 0;
  competitividade_planejado: number = 0;
  preco_venda_bruta_sugerido: number = 0;
  preco_venda_bruta_planejado: number = 0;
  custos_sugerido: number = 0;
  custos_planejado: number = 0;
  icms_sugerido: number = 0;
  pis_cofins_sugerido: number = 0;
  ipi_sugerido: number = 0
  st_sugerido: number = 0
  icms_planejado: number = 0;
  pis_cofins_planejado: number = 0;
  ipi_planejado: number = 0
  st_planejado: number = 0
  operacional_devolucao_sugerido: number = 0;
  operacional_devolucao_planejado: number = 0;
  operacional_logistica_sugerido: number = 0;
  operacional_logistica_planejado: number = 0;
  preco_base_sugerido: number = 0;
  preco_base_planejado: number = 0;
  rebate_sugerido: number = 0;
  rebate_planejado: number = 0;
  bonificacao_sugerido: number=0;
  bonificacao_planejado: number=0;
  funding_planejado: number = 0;
  verba_planejado: number = 0;
  verba_sugerido: number = 0;
  verba_especie_sugerido: any = 0;
  verba_especie_planejado: any = 0;
  margem_bruta_planejado: number = 0;
  cmv_sugerido: number = 0;
  cmv_planejado: number = 0;
  sensivel_rebate: string;

  deserialize(data: any) {
    Object.assign(this, data);
    return this
  }

}
