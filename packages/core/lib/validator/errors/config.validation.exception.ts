import { ConfigTemplateValidationError } from './config.template.validation.error';

export class ConfigValidationException extends Error {
  readonly errors: ConfigTemplateValidationError[];

  constructor(errors: ConfigTemplateValidationError[]) {
    super();
    this.errors = errors;
    this.message = 'Following templates failed validation: ' + errors.map(({ template }) => template.name).join(', ');
  }
}
