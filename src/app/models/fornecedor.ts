import { Deserializable } from '@app/interfaces/deserializable.model';
export class Fornecedor implements Deserializable {
  CODDIVFRN: number;
  NOMFRN:string;

  deserialize(data: any): this {
    Object.assign(this, data);
    return this;
  }

}
