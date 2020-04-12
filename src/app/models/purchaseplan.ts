import { Deserializable } from '@app/interfaces';

export class PurchasePlan implements Deserializable {
  CODESTUNI: string;
  CODFILEPD: number;
  CODFILFAT: number;
  CODPRD: number;
  NUMANOMESSMN: string;
  MRGBRTOCD: number;
  VLRCSTCMPMER: number;
  VLRCSTCMPIDL: number;
  VLRCMVOCD: number;
  VLRCMVOCD: number;
  VLRCMVCAL: number;
  VLRFLXPLN: number;
  VLRFLXSUG: number;
  VLRICMOCD: number;
  VLRICMCAL: number;
  VLRIMPTOTOCD: number;
  VLRIMPTOTCAL: number;
  VLRMRGBRTOCD: number;
  VLRMRGBRTCAL: number;
  VLRPCOBSECAL: number;
  VLRPCOBSEOCD: number;
  VLRMCDOCD: number;
  VLRMCDCAL: number;
  VLRDVLCAL: number;
  VLRPISOCD: number;
  VLRPISCAL: number;
  VLRPCOMEDMCD: number;
  VLRVNDLIQOCD: number;
  VLRVNDLIQCAL: number;
  VLRVNDPRVCTR: number;
  VLRPCOVNDLIQOCD: number;
  VLRPCOVNDLIQCAL: number;
  VLRVBAOCD: number;
  VLRRBTCAL: number;
  VLRRBTOCD: number;
  VLRCMVPCOATU: number;
  VLRRCTLIQOCD: number;
  VLRDVLOCD: number;


  deserialize(data: any) {
    Object.assign(this, data);
    return this;
  }

}
