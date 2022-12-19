import { ValidationError } from 'class-validator';
import { Type } from '../../utils/type.interface';

export interface ConfigValidationExceptionOptions {
  template: Type;
  errors: ValidationError[];
}
