import { Deserializable } from '@app/interfaces'

export class Filter implements Deserializable{
  // linha_negocio: string = null;
  // descgrpprd: string = null;
  // desctgprd: string = null;
  desdrtcllatu: string;
  codgrpmer: number;
  codfmlmer: number;
  codclsmer: number;
  coddivfrn: number;
  codfilfat: string;
  codfilepd: number;
  codestuni: string;
  codprd: string;

  deserialize(data: any) {
    Object.assign(this, data);
    return this
  }

  nullify(field) {
    this[field] = null
  }

}
