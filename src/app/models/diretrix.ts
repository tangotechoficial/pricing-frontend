import { Deserializable } from '@app/interfaces/deserializable.model';

export class Diretrix implements Deserializable {
  CODESTUNI: string;
  CODDIVFRN: number;
  DATREFPOD: string;
  NOMMES: string;
  NOMSMS: string;
  NOMDIASMN: string;
  NOMSMSANO: string;
  CODCLLCMPATU: number;
  DESCLLCMPATU: string;
  CODDRTCLLATU: number;
  DESDRTCLLATU: string;
  VLRVNDFATLIQ: string;
  VLRRCTLIQAPU: string;
  VLRMRGCRB: string;
  VLRMRGBRT: string;
  NOMCPR: string;
  CODFIL: number;
  INDCTGTOP: string;
  CODGRPMER: number;
  DESGRPMER: string;
  CODFMLMER: number;
  DESFMLMER: string;
  CODCLSMER: number;
  DESCLSMER: string;
  CODGRPFRN: number;
  NOMGRPFRN: string;
  NOMFRN: string;

  deserialize(data: any) {
    Object.assign(this, data);
    return this;
  }
}
