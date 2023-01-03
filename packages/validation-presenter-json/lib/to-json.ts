import { ConfigValidationException } from '@unifig/core';
import { ToJSONOptions } from './to-json.options';

export const toJSON = (validationException: ConfigValidationException, options: ToJSONOptions = {}): string =>
  JSON.stringify(
    validationException.errors.map((templateError) => ({
      template: templateError.template.name,
      errors: templateError.errors,
    })),
    null,
    options.space
  );
