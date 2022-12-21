import { PropertySource, PropertyTarget } from '../../loader/types';
import { FailedConstraint } from './failed-constraint';

export interface ConfigPropertyValidationError {
  readonly property: PropertyTarget;
  readonly source?: PropertySource;
  readonly currentValue: any;
  readonly failedConstraints: FailedConstraint[];
}
