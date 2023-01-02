import { PropertySource, PropertyTarget } from '../../loader/types';
import { FailedConstraint } from './failed-constraint';

export class ConfigPropertyValidationError {
  readonly property: PropertyTarget;
  readonly source?: PropertySource;
  readonly currentValue: any;
  readonly failedConstraints: FailedConstraint[];

  constructor(data: ConfigPropertyValidationError) {
    this.property = data.property;
    this.source = data.source;
    this.currentValue = data.currentValue;
    this.failedConstraints = data.failedConstraints;
  }
}
