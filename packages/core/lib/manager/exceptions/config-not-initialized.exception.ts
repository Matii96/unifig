import { Type } from '../../utils/type.interface';
import { UnifigException } from '../../exceptions/unifig.exception';

export class ConfigNotInitializedException extends UnifigException {
  constructor(template: Type) {
    super(`Config template ${template.name} hasn't been initialized. Did you miss to register it?`);
  }
}
