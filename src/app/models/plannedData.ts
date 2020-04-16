import { Deserializable } from '@app/interfaces/deserializable.model';

export class PlannedData implements Deserializable {
  id: number;
  CODPRD: any;
  CODFILEPD: any;
  CODFILFAT: any;
  CODESTUNI: any;
  NUMANOMESSMN: any;
  VLRVNDLIQCAL: any;
  VLRVNDLIQOCD: any;
  VLRMCDOCD: any;
  VLRPCOMEDMCD: any;
  MRGBRTPEROCD: any;
  VLRPCOVNDLIQOCD: any;
  VLRPCOBSEOCD: any;
  VLRIMPTOTOCD: any;
  VLRICMOCD: any;
  VLRPISOCD: any;
  VLRDVLOCD: any;
  VLRFLXPLN: any;
  VLRMRGBRTOCD: any;
  VLRRBTCAL: any;
  VLRVBAOCD: any;
  VLRCMVCAL: any;
  VLRCMVPCOATU: any;
  VLRCSTCMPIDL: any;

  deserialize(data: any): this {
    Object.assign(this, data);
    return this;
  }

}
