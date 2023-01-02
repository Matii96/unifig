import { ConfigTemplateValidationError } from './template.validation.error';

export class ConfigValidationException extends Error {
  readonly errors: ConfigTemplateValidationError[];

  constructor(errors: ConfigTemplateValidationError[]) {
    super();
    this.errors = errors;
    this.message =
      'Following configurations failed validation: ' + errors.map(({ template }) => template.name).join(', ');
  }
}
