import { isArray } from '@umatch/utils';
import { deepMap } from '@umatch/utils/object';

type ArrayValidationOptions = {
  minLength?: number;
  maxLength?: number;
};
type NestedArray<T> = T | ReadonlyArray<NestedArray<T>>;
export type Value = NestedArray<string | number | boolean>;

function getRawEnv(key: string): string {
  const raw = process.env[key];
  if (raw === undefined) {
    throw new Error('missing value');
  }
  return raw;
}

export abstract class Validator<T extends Value> {
  private _arrayOptions?: ArrayValidationOptions;
  public _default?: Value;
  public _optional = false;

  protected abstract _validate(raw: string): T;

  public validate(key: string): Value {
    const raw = getRawEnv(key);
    if (!this._arrayOptions) {
      return this._validate(raw);
    }

    // this is an array validator - validate the array, then each value
    const parsed = JSON.parse(raw.replace(/'/g, '"')) as unknown;

    if (!isArray(parsed)) {
      throw new Error('not an array');
    }

    const opts = { minLength: 1, ...this._arrayOptions };
    if (opts.minLength > parsed.length) {
      throw new Error('array too short');
    }

    if (opts.maxLength && opts.maxLength < parsed.length) {
      throw new Error('array too long');
    }

    // @ts-expect-error generics
    return deepMap(parsed, this._validate.bind(this));
  }

  public array(opts: ArrayValidationOptions = {}): Validator<T[]> {
    this._arrayOptions = opts;
    return this as unknown as Validator<T[]>;
  }

  public optional(defaultValue?: T) {
    this._default = defaultValue;
    this._optional = true;
    return this;
  }
}
