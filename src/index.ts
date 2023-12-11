import { Env } from './env';
import { BooleanValidator } from './Validators/BooleanValidator';
import {
  NumberValidator,
  type NumberValidationOptions,
} from './Validators/NumberValidator';
import {
  StringValidator,
  type StringValidationOptions,
} from './Validators/StringValidator';

class Validators {
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

export { Env, Validators };
