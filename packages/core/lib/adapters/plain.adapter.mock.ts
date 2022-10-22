import { IConfigAdapter } from './config-adapter.interface';

export class ConfigAdapterMock implements IConfigAdapter {
  load = jest.fn(async () => ({}));
}
