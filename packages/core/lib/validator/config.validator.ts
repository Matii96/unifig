import { validateSync, ValidationError } from 'class-validator';
import { ConfigValidationException } from './config.validation.exception';

export class ConfigValidator {
  validate<TConfig extends object>(config: TConfig) {
    const errors = validateSync(config, { skipMissingProperties: false });
    if (errors.length === 0) {
      return;
    }
    const errorFormatted = '\n' + errors.map((error) => this.format(error)).join('');
    throw new ConfigValidationException(config, errorFormatted);
  }

  private format(error: ValidationError, parentPath = '') {
    let msg = error.constraints
      ? ` - ${parentPath}${error.property} has failed the following constraints:` +
        ` ${Object.keys(error.constraints).join(', ')}.` +
        ` Current value: ${error.value}\n`
      : '';
    msg += error.children?.map((child) => this.format(child, parentPath + `${error.property}.`)).join('');
    return msg;
  }
}
