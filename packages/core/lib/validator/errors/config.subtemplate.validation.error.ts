import { PropertyTarget } from '../../loader/types';
import { ConfigPropertyValidationError } from './config.property.validation.error';
import { FailedConstraint } from './failed-constraint';

export interface ConfigSubtemplateValidationError {
  readonly property: PropertyTarget;
  readonly failedConstraints?: FailedConstraint[];
  readonly children: (ConfigPropertyValidationError | ConfigSubtemplateValidationError)[];
}
