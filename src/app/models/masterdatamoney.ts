import { Deserializable } from '@app/interfaces';

export class MasterDataMoney implements Deserializable {
  url: string;
  numanomes: number;
  codprd: number;
  desprd: string;
  codfilepd: number;
  coddivfrn: number;
  vlrprecosaldomesanterior: number;
  vlrprecocredito: number;
  vlrprecodebito: number;
  vlrmargemsaldomesanterior: number;
  vlrmargemcredito: number;
  vlrmargemdebito: number;

  deserialize(data: any) {
    Object.assign(this, data)
    return this

  }
}
