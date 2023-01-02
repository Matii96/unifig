import { ClassConstructor } from '../../utils/class-constructor.interface';
import { ConfigPropertyValidationError } from './property.validation.error';
import { ConfigSubtemplateValidationError } from './subtemplate.validation.error';

export class ConfigTemplateValidationError {
  readonly template: ClassConstructor;
  readonly errors: (ConfigPropertyValidationError | ConfigSubtemplateValidationError)[];

  constructor(data: ConfigTemplateValidationError) {
    this.template = data.template;
    this.errors = data.errors;
  }
}
