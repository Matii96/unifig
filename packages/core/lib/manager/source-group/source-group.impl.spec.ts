import 'reflect-metadata';
import { TemplateMock } from '../../core.mocks';
import { ConfigAdapterMock, ConfigSyncAdapterMock } from '../../adapters/adapter.mock';
import { LoaderMock } from '../../loader/loader.mock';
import { ValidatorMock } from '../../validator/validator.mock';
import { ConfigAdapter, ConfigSyncAdapter } from '../../adapters';
import { ConfigContainerMock } from '../container/container.mock';
import { AdapterTypeMismatchException } from './exceptions';
import { ConfigSourceGroup } from './source-group.impl';
import { SourceGroup } from './source-group';

describe('ConfigSourceGroup', () => {
  const source = { port: 3000, db: { url: 'db://localhost', password: 'password' } };

  describe('async adapter', () => {
    let adapter: ConfigAdapter;
    let sourceGroup: SourceGroup;

    beforeEach(() => {
      adapter = new ConfigAdapterMock();
      jest.spyOn(adapter, 'load').mockResolvedValueOnce(source);
      sourceGroup = new ConfigSourceGroup(new LoaderMock(), new ValidatorMock(), () => new ConfigContainerMock());
      sourceGroup.init(adapter, [TemplateMock], {});
    });

    it('should load config from source', async () => {
      const instances = await sourceGroup.load();
      expect(instances).toHaveLength(1);
      expect(instances[0]).toEqual(source);
    });

    it('should fail on attempt to load config via async adapter synchronously', () => {
      expect(() => sourceGroup.loadSync()).toThrow(AdapterTypeMismatchException);
    });
  });

  describe('sync adapter', () => {
    let adapter: ConfigSyncAdapter;
    let sourceGroup: SourceGroup;

    beforeEach(() => {
      adapter = new ConfigSyncAdapterMock();
      jest.spyOn(adapter, 'load').mockReturnValueOnce(source);
      sourceGroup = new ConfigSourceGroup(new LoaderMock(), new ValidatorMock(), () => new ConfigContainerMock());
      sourceGroup.init(adapter, [TemplateMock], {});
    });

    it('should sync load config from source', () => {
      const instances = sourceGroup.loadSync();
      expect(instances).toHaveLength(1);
      expect(instances[0]).toEqual(source);
    });
  });
});
