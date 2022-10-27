import Validator from './index';

/*
 This is the least verbose way of declaring a classes' properties in
 a way that can be accessed externally. The tradeoff is that
 properties default to public and writable.
 https://stackoverflow.com/q/43838202/9193449
*/
export type NumberValidationOptions = {
  min?: number;
  max?: number;
};
export interface NumberValidator extends NumberValidationOptions {}
export class NumberValidator extends Validator<number> {
  public constructor(opts?: NumberValidationOptions) {
    super();
    Object.assign(this, opts);
  }

  protected _validate(raw: string): number {
    const val = Number(raw);

    if (isNaN(val)) {
      throw new Error('not a number');
    }

    if (this.min && val < this.min) {
      throw new Error('too small');
    }

    if (this.max && val > this.max) {
      throw new Error('too large');
    }

    return val;
  }
}
