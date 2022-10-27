import { parseBool } from '@umatch/utils/string';

import Validator from './index';

export class BooleanValidator extends Validator<boolean> {
  protected _validate(raw: string): boolean {
    return parseBool(raw);
  }
}
