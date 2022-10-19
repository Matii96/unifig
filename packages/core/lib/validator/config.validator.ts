import { validateSync, ValidationError } from 'class-validator';
import { ConfigValidationException } from './config.validation.exception';

export class ConfigValidator {
  validate(configs: object[]) {
    const errors = validateSync(config, { skipMissingProperties: false });
    // if (errors.length === 0) {
    //   return;
    // }
    // const errorFormatted = '\n' + errors.map((error) => this.format(error)).join('');
    // throw new ConfigValidationException(config, errorFormatted);
  }
}
