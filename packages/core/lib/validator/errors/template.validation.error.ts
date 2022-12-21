import { ClassConstructor } from '../../utils/class-constructor.interface';
import { ConfigPropertyValidationError } from './property.validation.error';
import { ConfigSubtemplateValidationError } from './subtemplate.validation.error';

export interface ConfigTemplateValidationError {
  readonly template: ClassConstructor;
  readonly errors: (ConfigPropertyValidationError | ConfigSubtemplateValidationError)[];
}
