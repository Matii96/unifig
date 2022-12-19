import { validateSync } from 'class-validator';
import { Type } from '../utils/type.interface';
import { ConfigValidationException } from './exception/config.validation.exception';
import { ConfigValidationExceptionOptions } from './exception/config.validation.exception.options';

export class ConfigValidator {
  validate(configs: object[]) {
    const failedValidations = configs
      .map<ConfigValidationExceptionOptions>((config) => ({
        template: config.constructor as Type,
        errors: validateSync(config, { skipMissingProperties: false }),
      }))
      .filter(({ errors }) => errors.length > 0);

    if (failedValidations.length > 0) {
      throw new ConfigValidationException(failedValidations);
    }
  }
}
