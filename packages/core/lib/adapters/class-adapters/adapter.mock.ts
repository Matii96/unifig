import { ConfigAdapter } from './adapter';
import { ConfigSyncAdapter } from './sync-adapter';

export class ConfigAdapterMock implements ConfigAdapter {
  load = jest.fn(async () => ({}));
}

export class ConfigSyncAdapterMock implements ConfigSyncAdapter {
  load = jest.fn(() => ({}));
}
