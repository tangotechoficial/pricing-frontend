import { Deserializable } from '@app/interfaces/deserializable.model';

export class Category implements Deserializable {

  CODFMLMER: number;
  DESFMLMER: string;


  deserialize(data: any) {
    Object.assign(this, data);
    return this
  }
}