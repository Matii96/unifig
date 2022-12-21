import { ClassConstructor } from '../utils/class-constructor.interface';
import { ConfigSource } from '../adapters/adapter';
import { Loader } from './loader';

export class LoaderMock implements Loader {
  load = jest.fn((template: ClassConstructor, source: ConfigSource) => source as any);
}
