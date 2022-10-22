import { Type } from '../utils/type.interface';
import { ConfigSource } from '../adapters/config-adapter.interface';

export class ConfigLoaderMock {
  load = jest.fn((template: Type, source: ConfigSource) => source);
}
