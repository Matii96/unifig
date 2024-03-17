import { ConfigValidationError } from '../../validation.error';
import { ToJSONOptions } from './to-json.options';

export const toJSON = (
  validationException: ConfigValidationError,
  options: ToJSONOptions = {},
): string =>
  JSON.stringify(
    validationException.errors.map((templateError) => ({
      template: templateError.template.name,
      errors: templateError.errors,
    })),
    null,
    options.space,
  );
