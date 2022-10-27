import { deepMap } from '@umatch/utils/object';

type ArrayValidationOptions = {
  minLength?: number;
  maxLength?: number;
};

function getRawEnv(key: string): string {
  const raw = process.env[key];
  if (raw === undefined) {
    throw new Error('missing value');
  }
  return raw;
}

export default abstract class Validator<T> {
  private _arrayOptions?: ArrayValidationOptions;
  public _default?: T;
  public _optional = false;

  protected abstract _validate(raw: string): T;

  public validate(key: string): any {
    const raw = getRawEnv(key);
    if (!this._arrayOptions) {
      return this._validate(raw);
    }

    // this is an array validator - validate the array, then each value
    const parsed = JSON.parse(raw.replace(/'/g, '"'));

    if (!Array.isArray(parsed)) {
      throw new Error('not an array');
    }

    const opts = { minLength: 1, ...this._arrayOptions };
    if (opts.minLength > parsed.length) {
      throw new Error('array too short');
    }

    if (opts.maxLength && opts.maxLength < parsed.length) {
      throw new Error('array too long');
    }

    return deepMap(parsed, this._validate.bind(this));
  }

  public array(opts: ArrayValidationOptions = {}): Validator<T[]> {
    this._arrayOptions = opts;
    return this as Validator<T[]>;
  }

  public optional(defaultValue?: T) {
    this._default = defaultValue;
    this._optional = true;
    return this;
  }
}
