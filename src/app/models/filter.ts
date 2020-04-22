import { Deserializable } from '@app/interfaces'

export class Filter implements Deserializable{
  // linha_negocio: string = null;
  // descgrpprd: string = null;
  // desctgprd: string = null;
  desdrtcllatu: string = null;
  codgrpmer: string = null;
  codfmlmer: string = null;
  codclsmer: string = null;
  coddivfrn: string = null;
  codfilfat: string = null;
  codfilepd: string = null;
  codestuni: string = null;
  codprd: string = null;

  deserialize(data: any) {
    Object.assign(this, data);
    return this
  }

  nullify(field) {
    this[field] = null
  }

}
