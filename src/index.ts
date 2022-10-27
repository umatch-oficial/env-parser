import { BooleanValidator } from './Validators/BooleanValidator';
import { NumberValidator, NumberValidationOptions } from './Validators/NumberValidator';
import { StringValidator, StringValidationOptions } from './Validators/StringValidator';

export { default as Env } from './env';
export class Validators {
  static boolean() {
    return new BooleanValidator();
  }
  static number(options?: NumberValidationOptions) {
    return new NumberValidator(options);
  }
  static port() {
    return new NumberValidator({ min: 1024, max: 65353 });
  }
  static string(options?: StringValidationOptions) {
    return new StringValidator(options);
  }
}
