import 'reflect-metadata';
import { TemplateMock } from '../../core.mocks';
import { ConfigAdapterMock } from '../../adapters/adapter.mock';
import { LoaderMock } from '../../loader/loader.mock';
import { ValidatorMock } from '../../validator/validator.mock';
import { ConfigAdapter } from '../../adapters';
import { ConfigContainerMock } from '../container/container.mock';
import { ConfigSourceGroup } from './source-group.impl';
import { SourceGroup } from './source-group';

describe('ConfigSourceGroup', () => {
  const value = { port: 3000, db: { url: 'db://localhost', password: 'password' } };
  let adapter: ConfigAdapter;
  let sourceGroup: SourceGroup;

  beforeEach(() => {
    adapter = new ConfigAdapterMock();
    jest.spyOn(adapter, 'load').mockResolvedValueOnce(value);
    sourceGroup = new ConfigSourceGroup(new LoaderMock(), new ValidatorMock(), () => new ConfigContainerMock());
    sourceGroup.init(adapter, [TemplateMock]);
  });

  it('should load config from source', async () => {
    const instances = await sourceGroup.load();
    expect(instances).toHaveLength(1);
    expect(instances[0]).toEqual(value);
  });
});
