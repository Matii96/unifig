import { ConfigValidationException } from './errors/validation.exception';

export interface Validator {
  validate(configs: object[]): ConfigValidationException | undefined;
}
