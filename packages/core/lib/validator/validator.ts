import { ConfigValidationError } from './errors/validation.error';

export interface Validator {
  validate(configs: object[]): ConfigValidationError | undefined;
}
