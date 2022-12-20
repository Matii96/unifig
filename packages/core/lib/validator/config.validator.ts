import { validateSync, ValidationError } from 'class-validator';
import { PROPERTIES_MAPPING_METADATA } from '../loader/constants';
import { PropertiesMapping } from '../loader/types';
import { Type } from '../utils/type.interface';
import { ConfigPropertyValidationError } from './errors/config.property.validation.error';
import { ConfigSubtemplateValidationError } from './errors/config.subtemplate.validation.error';
import { ConfigTemplateValidationError } from './errors/config.template.validation.error';
import { ConfigValidationException } from './errors/config.validation.exception';

export class ConfigValidator {
  validate(configs: object[]) {
    const failedValidations = configs
      .map((config) => this.validateTemplate(config))
      .filter(({ errors }) => errors.length > 0);
    if (failedValidations.length > 0) {
      return new ConfigValidationException(failedValidations);
    }
  }

  private validateTemplate(config: object): ConfigTemplateValidationError {
    return {
      template: config.constructor as Type,
      errors: validateSync(config, { skipMissingProperties: false }).map((error) => this.toPropertyError(error)),
    };
  }

  private toPropertyError(error: ValidationError): ConfigPropertyValidationError | ConfigSubtemplateValidationError {
    if (error.children && error.children.length > 0) {
      return {
        property: error.property,
        failedConstraints: this.toFailedConstraints(error.constraints),
        children: error.children.map((child) => this.toPropertyError(child)),
      } satisfies ConfigSubtemplateValidationError;
    }

    const propertiesMapping: PropertiesMapping = error.target
      ? Reflect.getMetadata(PROPERTIES_MAPPING_METADATA, error.target.constructor)
      : undefined;
    return {
      property: error.property,
      source: propertiesMapping?.get(error.property),
      currentValue: error.value,
      failedConstraints: this.toFailedConstraints(error.constraints) ?? [],
    } satisfies ConfigPropertyValidationError;
  }

  private toFailedConstraints(constraints: ValidationError['constraints']) {
    if (!constraints) {
      return;
    }
    const constraintsKeys = Object.keys(constraints);
    if (constraintsKeys.length === 0) {
      return;
    }
    return constraintsKeys.map((name) => ({ name, details: constraints[name] }));
  }
}
