import Validator from './index';

/*
 This is the least verbose way of declaring a classes' properties in
 a way that can be accessed externally. The tradeoff is that
 properties default to public and writable.
 https://stackoverflow.com/q/43838202/9193449
*/
export type StringValidationOptions = {
  minLength?: number;
  maxLength?: number;
};
export interface StringValidator extends StringValidationOptions {}
export class StringValidator extends Validator<string> {
  public constructor(opts?: StringValidationOptions) {
    super();
    Object.assign(this, opts);
  }

  protected _validate(raw: string): string {
    const val = String(raw);

    if (this.minLength && val.length < this.minLength) {
      throw new Error('too short');
    }

    if (this.maxLength && val.length > this.maxLength) {
      throw new Error('too long');
    }

    return val;
  }
}
