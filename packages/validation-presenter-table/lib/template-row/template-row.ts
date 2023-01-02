import { ConfigPropertyValidationError, ConfigSubtemplateValidationError, FailedConstraint } from '@unifig/core';

export class TemplateRow {
  propertyParentPrefix?: string;
  property: string;
  source?: string;
  currentValue?: any;
  failedConstraints?: FailedConstraint[];

  static fromValidationError(
    error: ConfigPropertyValidationError | ConfigSubtemplateValidationError,
    propertyParentPrefix?: string
  ) {
    const row = new TemplateRow();
    row.propertyParentPrefix = propertyParentPrefix;
    row.property = error.property;
    row.failedConstraints = error.failedConstraints;

    if (error instanceof ConfigPropertyValidationError) {
      row.source = error.source;
      row.currentValue = error.currentValue;
    }

    return row;
  }

  toArray(): [string, string, string, string, string] {
    return [
      '',
      (this.propertyParentPrefix ?? '') + this.property,
      this.source ?? '',
      this.currentValue ?? 'undefined',
      this.failedConstraintsToNames(),
    ];
  }

  private failedConstraintsToNames() {
    return this.failedConstraints
      ? this.failedConstraints.map((failedConstraint) => failedConstraint.name).join(', ')
      : '';
  }
}
