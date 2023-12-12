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

const Validators = {
  /**
   * Returns a boolean validator.
   */
  boolean: () => new BooleanValidator(),
  /**
   * Returns a number validator.
   *
   * @param {NumberValidationOptions} options The options for the NumberValidator.
   * @param {number} options.min The minimum value for the number.
   * @param {number} options.max The maximum value for the number.
   */
  number: (options?: NumberValidationOptions) => new NumberValidator(options),
  /**
   * Returns a port validator.
   *
   * It is a number validator with a minimum of 1024 and a maximum of 65353.
   */
  port: () => new NumberValidator({ min: 1024, max: 65353 }),
  /**
   * Returns a string validator.
   * @param {StringValidationOptions} options The options for the StringValidator.
   * @param {number} options.minLength The minimum length for the string.
   * @param {number} options.maxLength The maximum length for the string.
   */
  string: (options?: StringValidationOptions) => new StringValidator(options),
};

export { Env, Validators };
