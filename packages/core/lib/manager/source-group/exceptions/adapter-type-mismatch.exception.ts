import { ConfigAdapter } from '../../../adapters';
import { UnifigException } from '../../../exceptions/unifig.exception';
import { ClassConstructor } from '../../../utils/class-constructor';

export class AdapterTypeMismatchException extends UnifigException {
  constructor(adapterType: ClassConstructor<ConfigAdapter>) {
    super(`Attempted to load config synchronously with asynchronous ${adapterType.name}`);
  }
}
