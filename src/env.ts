import type { Validator, Value } from './Validators';

export class Env<Schema extends { [_: string]: Validator<Value> }> {
  private readonly validated: { readonly [K in keyof Schema]: Value };

  constructor(schema: Schema) {
    this.validated = this.validate(schema);
  }

  private validate(schema: Schema): { [K in keyof Schema]: Value } {
    const errors: string[] = [];
    const validated = {} as { [K in keyof Schema]: Value };
    for (const key in schema) {
      const validator = schema[key];
      try {
        validated[key] = validator.validate(key);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const optional = validator._optional && message.match(/missing value/);
        if (optional) {
          if (validator._default !== undefined) {
            validated[key] = validator._default;
          }
        } else {
          errors.push(`${key}: ${message}`);
        }
      }
    }
    if (errors.length > 0) {
      const sep = '\n\t- ';
      throw new Error(`Error validating env vars:${sep}${errors.join(sep)}`);
    }
    return Object.freeze(validated);
  }

  public get<K extends keyof Schema>(
    key: K,
  ): Schema[K] extends Validator<infer T> ? T : never {
    // @ts-expect-error generics
    return this.validated[key];
  }
}
