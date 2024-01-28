import 'reflect-metadata';
import { TemplateMock } from '../../core.mocks';
import { LoaderMock } from '../../loader/loader.mock';
import { ValidatorMock } from '../../validator/validator.mock';
import {
  ConfigAdapterMock,
  ConfigSyncAdapterMock,
} from '../../adapters/class-adapters/adapter.mock';
import { ConfigAdapter } from '../../adapters';
import { ConfigContainerMock } from '../container/container.mock';
import { AdapterTypeMismatchException } from './exceptions';
import { ConfigSourceGroup } from './source-group.impl';

describe('ConfigSourceGroup', () => {
  const source = { port: 3000, db: { url: 'db://localhost', password: 'password' } };

  describe('async adapter', () => {
    describe('class adapter', () => {
      let adapter: ConfigAdapter;
      let sourceGroup: ConfigSourceGroup;

      beforeEach(() => {
        adapter = new ConfigAdapterMock();
        jest.spyOn(adapter, 'load').mockResolvedValueOnce(source);
        sourceGroup = new ConfigSourceGroup(
          new LoaderMock(),
          new ValidatorMock(),
          () => new ConfigContainerMock(),
        );
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

    describe('function adapter', () => {
      let sourceGroup: ConfigSourceGroup;

      beforeEach(() => {
        sourceGroup = new ConfigSourceGroup(
          new LoaderMock(),
          new ValidatorMock(),
          () => new ConfigContainerMock(),
        );
        sourceGroup.init(async () => source, [TemplateMock], {});
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
  });

  describe('sync adapter', () => {
    let sourceGroup: ConfigSourceGroup;

    beforeEach(() => {
      sourceGroup = new ConfigSourceGroup(
        new LoaderMock(),
        new ValidatorMock(),
        () => new ConfigContainerMock(),
      );
    });

    it('should sync load config from source', () => {
      const classAdapter = new ConfigSyncAdapterMock();
      jest.spyOn(classAdapter, 'load').mockReturnValueOnce(source);
      sourceGroup.init(classAdapter, [TemplateMock], {});

      const instances = sourceGroup.loadSync();
      expect(instances).toHaveLength(1);
      expect(instances[0]).toEqual(source);
    });

    it('should sync load config from function source', () => {
      sourceGroup.init(() => source, [TemplateMock], {});
      const instances = sourceGroup.loadSync();
      expect(instances).toHaveLength(1);
      expect(instances[0]).toEqual(source);
    });
  });
});
