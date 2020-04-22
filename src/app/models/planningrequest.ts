import { Deserializable } from '@app/interfaces/deserializable.model';

export class PlanningRequest implements Deserializable {
  week: number;
  // tslint:disable-next-line: variable-name
  plan_month: number;
  // tslint:disable-next-line: variable-name
  plan_year: number;
  prd: any;
  est: any;
  vrbpln: number;
  cmvcmp: number;
  deserialize(data: any): this {
    Object.assign(this, data);
    return this;
  }

}
