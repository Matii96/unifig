import 'reflect-metadata';
import { TemplateMock } from '../../core.mocks';
import { IConfigAdapter } from '../../adapters/config-adapter.interface';
import { ConfigAdapterMock } from '../../adapters/plain.adapter.mock';
import { ConfigLoaderMock } from '../../loader/config.loader.mock';
import { ConfigValidatorMock } from '../../validator/config.validator.mock';
import { ConfigSourceGroup } from './config.source-group';

jest.mock('../../loader/config.loader', () => ({ __esModule: true, ConfigLoader: ConfigLoaderMock }));
jest.mock('../../validator/config.validator', () => ({ __esModule: true, ConfigValidator: ConfigValidatorMock }));

describe('ConfigSourceGroup', () => {
  const value = { port: 3000, db: { url: 'db://localhost', password: 'password' } };
  let adapter: IConfigAdapter;
  let sourceGroup: ConfigSourceGroup;

  beforeEach(() => {
    adapter = new ConfigAdapterMock();
    jest.spyOn(adapter, 'load').mockResolvedValueOnce(value);
    sourceGroup = new ConfigSourceGroup(adapter, [TemplateMock]);
  });

  it('should load config from source', async () => {
    const instances = await sourceGroup.load();
    expect(instances).toHaveLength(1);
    expect(instances[0]).toEqual(value);
  });
});
