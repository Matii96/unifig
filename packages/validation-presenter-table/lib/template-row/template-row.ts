import {
  ConfigPropertyValidationError,
  ConfigSubtemplateValidationError,
  FailedConstraint,
} from '@unifig/core';

export class TemplateRow {
  propertyParentPrefix?: string;
  property: string;
  type?: string;
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
    row.type = error instanceof ConfigPropertyValidationError ? error.type : undefined;
    row.failedConstraints = error.failedConstraints;

    if (error instanceof ConfigPropertyValidationError) {
      row.source = error.source;
      row.currentValue = error.currentValue;
    }

    return row;
  }

  toArray(): [string, string, string, string, string, string] {
    return [
      '',
      (this.propertyParentPrefix ?? '') + this.property,
      this.type ?? '',
      this.source ?? '',
      this.formatValue(),
      this.failedConstraintsToNames(),
    ];
  }

  private failedConstraintsToNames() {
    return this.failedConstraints
      ? this.failedConstraints.map((failedConstraint) => failedConstraint.name).join(', ')
      : '';
  }

  private formatValue() {
    if (Number.isNaN(this.currentValue)) {
      return 'Not-A-Number';
    }
    return JSON.stringify(this.currentValue);
  }
}
