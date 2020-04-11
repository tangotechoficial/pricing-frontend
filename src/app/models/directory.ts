import { Deserializable } from '@app/interfaces/deserializable.model';
export class Directory implements Deserializable {
  DESDRTCLLATU: string;

  deserialize(data: any): this {
    Object.assign(this, data);
    return this;
  }

}
