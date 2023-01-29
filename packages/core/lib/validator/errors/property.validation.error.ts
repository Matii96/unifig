import { PropertySource, PropertyTarget, PropertyType } from '../../shared/types';
import { FailedConstraint } from './failed-constraint';

export class ConfigPropertyValidationError {
  readonly property: PropertyTarget;
  readonly type: PropertyType;
  readonly source?: PropertySource;
  readonly currentValue: any;
  readonly failedConstraints: FailedConstraint[];

  constructor(data: ConfigPropertyValidationError) {
    this.property = data.property;
    this.type = data.type;
    this.source = data.source;
    this.currentValue = data.currentValue;
    this.failedConstraints = data.failedConstraints;
  }
}
