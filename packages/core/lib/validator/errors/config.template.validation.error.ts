import { Type } from '../../utils/type.interface';
import { ConfigPropertyValidationError } from './config.property.validation.error';
import { ConfigSubtemplateValidationError } from './config.subtemplate.validation.error';

export interface ConfigTemplateValidationError {
  readonly template: Type;
  readonly errors: (ConfigPropertyValidationError | ConfigSubtemplateValidationError)[];
}
