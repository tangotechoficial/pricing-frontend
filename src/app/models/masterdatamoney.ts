import { Deserializable } from '@app/interfaces';

export class MasterDataMoney implements Deserializable {
  url: string;
  numanomes: number;
  codprd: number;
  datref: string;
  codfilepd: number;
  coddivfrn: number;
  vlrsldpcomesant: number;
  vlrcrdpco: number;
  vlrdbtpco: number;
  vlrsldmrgmesant: number;
  vlrcrdmrg: number;
  vlrdbtmrg: number;

  deserialize(data: any) {
    Object.assign(this, data)
    return this

  }
}
