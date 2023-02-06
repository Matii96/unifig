import { PropertyTarget } from '../../shared/types';
import { ConfigPropertyValidationError } from './property.validation.error';
import { FailedConstraint } from './failed-constraint';

export class ConfigSubtemplateValidationError {
  readonly property: PropertyTarget;
  readonly failedConstraints?: FailedConstraint[];
  readonly children: (ConfigPropertyValidationError | ConfigSubtemplateValidationError)[];

  constructor(data: ConfigSubtemplateValidationError) {
    this.property = data.property;
    this.failedConstraints = data.failedConstraints;
    this.children = data.children;
  }
}
