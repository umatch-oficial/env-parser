import { Validator } from './index';

export type StringValidationOptions = {
  minLength?: number;
  maxLength?: number;
};
export class StringValidator extends Validator<string> {
  private readonly minLength?: number;
  private readonly maxLength?: number;

  public constructor(opts?: StringValidationOptions) {
    super();
    this.minLength = opts?.minLength;
    this.maxLength = opts?.maxLength;
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
