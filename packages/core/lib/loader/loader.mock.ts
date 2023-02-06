import { ClassConstructor } from '../utils/class-constructor';
import { ConfigSource } from '../adapters/types';
import { Loader } from './loader';

export class LoaderMock implements Loader {
  load = jest.fn((template: ClassConstructor, source: ConfigSource) => source as any);
}
