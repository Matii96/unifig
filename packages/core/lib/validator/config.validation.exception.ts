import { ValidationError } from 'class-validator';

export class ConfigValidationException extends Error {
  constructor(configs: object[], errors: ValidationError[]) {
    super(`Validation failed for ${config.constructor.name}:${msg}`);
    this.name = ConfigValidationException.name;
  }
}
