import { Deserializable } from '@app/interfaces'

export class Material  implements Deserializable {
  codprd: string = '';
  desprd: string = '';

  deserialize(data: any) {
    Object.assign(this, data);
    return this
  }
}
