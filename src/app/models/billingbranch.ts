import { Deserializable } from '@app/interfaces/deserializable.model';

export class BillingBranch implements Deserializable {
  codfilfat: string;

  deserialize(data: any) {
    Object.keys(data).forEach(key => {
      // tslint:disable-next-line: no-unused-expression
      data[key] === undefined || data[key] === null || data[key] === '' ? delete data[key] : {};
    }); // remove empty strings, undefined, nulled keys from data
    Object.assign(this, data);
    return this;
  }

}
