import { Deserializable } from '@app/interfaces/deserializable.model';
export class Filial implements Deserializable {
  CODESTUNI: string;

  deserialize(data: any): this {
    Object.assign(this, data);
    return this;
  }

}