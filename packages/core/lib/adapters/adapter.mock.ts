import { ConfigAdapter } from './adapter';

export class ConfigAdapterMock implements ConfigAdapter {
  load = jest.fn(async () => ({}));
}
