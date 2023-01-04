import { validateSync, ValidationError } from 'class-validator';
import { PROPERTIES_MAPPING_METADATA } from '../loader/constants';
import { PropertiesMapping } from '../loader/types';
import { ClassConstructor } from '../utils/class-constructor.interface';
import { ConfigPropertyValidationError } from './errors/property.validation.error';
import { ConfigSubtemplateValidationError } from './errors/subtemplate.validation.error';
import { ConfigTemplateValidationError } from './errors/template.validation.error';
import { ConfigValidationError } from './errors/validation.error';
import { Validator } from './validator';

export class ClassValidator implements Validator {
  validate(configs: object[]) {
    const failedValidations = configs
      .map((config) => this.validateTemplate(config))
      .filter(({ errors }) => errors.length > 0);
    if (failedValidations.length > 0) {
      return new ConfigValidationError(failedValidations);
    }
  }

  private validateTemplate(config: object): ConfigTemplateValidationError {
    return new ConfigTemplateValidationError({
      template: config.constructor as ClassConstructor,
      errors: validateSync(config, { skipMissingProperties: false, forbidUnknownValues: false }).map((error) =>
        this.toPropertyError(error)
      ),
    });
  }

  private toPropertyError(error: ValidationError): ConfigPropertyValidationError | ConfigSubtemplateValidationError {
    if (error.children && error.children.length > 0) {
      return new ConfigSubtemplateValidationError({
        property: error.property,
        failedConstraints: this.toFailedConstraints(error.constraints),
        children: error.children.map((child) => this.toPropertyError(child)),
      });
    }

    const propertiesMapping: PropertiesMapping = error.target
      ? Reflect.getMetadata(PROPERTIES_MAPPING_METADATA, error.target.constructor)
      : undefined;
    return new ConfigPropertyValidationError({
      property: error.property,
      source: propertiesMapping?.get(error.property),
      currentValue: error.value,
      failedConstraints: this.toFailedConstraints(error.constraints) ?? [],
    });
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
