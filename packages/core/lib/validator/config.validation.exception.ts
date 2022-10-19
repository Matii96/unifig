import { ValidationError } from 'class-validator';

export class ConfigValidationException extends Error {
  constructor(configs: object[], errors: ValidationError[]) {
    super(`Validation failed for ${config.constructor.name}:${msg}`);
    this.name = ConfigValidationException.name;
  }

  private formatMessage(error: ValidationError, parentPath = '') {
    let msg = error.constraints
      ? ` - ${parentPath}${error.property} has failed the following constraints:` +
        ` ${Object.keys(error.constraints).join(', ')}.` +
        ` Current value: ${error.value}\n`
      : '';
    msg += error.children?.map((child) => this.format(child, parentPath + `${error.property}.`)).join('');
    return msg;
  }
}
