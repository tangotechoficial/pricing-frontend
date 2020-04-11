import { Deserializable } from '@app/interfaces/deserializable.model';
export class Groups implements Deserializable {
  CODGRPMER: number;
  DESGRPMER: string;

  deserialize(data: any): this {
    Object.assign(this, data);
    return this;
  }

}
