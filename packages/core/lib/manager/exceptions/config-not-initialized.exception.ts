import { UnifigException } from '../../exceptions/unifig.exception';
import { ClassConstructor } from '../../utils/class-constructor';

export class ConfigNotInitializedException extends UnifigException {
  constructor(template: ClassConstructor) {
    super(`Config template ${template.name} hasn't been initialized. Did you miss to register it?`);
  }
}
