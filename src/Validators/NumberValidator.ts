import { Validator } from './index';

export type NumberValidationOptions = { min?: number; max?: number };

export class NumberValidator extends Validator<number> {
  private readonly min?: number;
  private readonly max?: number;
  public constructor(opts?: NumberValidationOptions) {
    super();
    this.min = opts?.min;
    this.max = opts?.max;
  }

  protected _validate(raw: string) {
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
