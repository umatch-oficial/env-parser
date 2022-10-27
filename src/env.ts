import type Validator from './Validators';

export default class Env<Schema extends { [_: string]: Validator<unknown> }> {
  private readonly schema: Schema;
  private readonly validated: {
    [K in keyof Schema]: Schema[K] extends Validator<infer T> ? T : never;
  };

  constructor(schema: Schema) {
    this.schema = schema;
    // @ts-ignore
    this.validated = {};
    this.validate();
  }

  private validate() {
    const errors: string[] = [];
    Object.entries(this.schema).forEach(
      ([key, validator]: [keyof Schema & string, any]) => {
        try {
          this.validated[key] = validator.validate(key);
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          const optional = validator._optional && message.match(/missing value/);
          if (optional) {
            if (validator._default !== undefined) {
              this.validated[key] = validator._default;
            }
          } else {
            errors.push(`${key}: ${message}`);
          }
        }
      },
    );
    if (errors.length > 0) {
      const sep = '\n\t- ';
      throw new Error(`Error validating env vars:${sep}${errors.join(sep)}`);
    }
    Object.freeze(this.validated);
  }

  public get<K extends keyof Schema>(
    key: K,
  ): Schema[K] extends Validator<infer T> ? T : never {
    return this.validated[key];
  }
}
