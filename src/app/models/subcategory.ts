import { Deserializable } from '@app/interfaces/deserializable.model';
export class SubCategory implements Deserializable {
  CODCLSMER: number;
  DESCLSMER: string;

  deserialize(data: any): this {
    Object.assign(this, data);
    return this;
  }

}
