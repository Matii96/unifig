import { UnifigException } from '../../exceptions/unifig.exception';
import { ClassConstructor } from '../../utils/class-constructor';

export class ConfigNotInitializedException extends UnifigException {
  constructor(template: ClassConstructor) {
    super(
      `Config template ${template.name} hasn't been initialized. Possible reasons:\n` +
        "- It wasn't registered before accessing it\n" +
        '- Its validation failed but was not handled by e.g. exiting the app'
    );
  }
}
