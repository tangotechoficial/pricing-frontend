import { Deserializable } from '@app/interfaces'

export class Filter implements Deserializable{
  line: string = null;
  category: string = null;
  subCategory: string = null;
  provider: string = null;
  fe: number = null;
  uf: string = null;
  material: string = null;

  deserialize(data: any) {
    Object.assign(this, data);
    return this
  }
}
