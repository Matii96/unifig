import 'reflect-metadata';
import { TemplateMock, DbConfigMock } from '../core.mocks';
import { ConfigLoader } from './loader.impl';
import { Loader } from './loader';
import { From } from './decorators';

describe('ConfigLoader', () => {
  let loader: Loader;

  beforeEach(() => {
    loader = new ConfigLoader();
  });

  describe('1d transformation', () => {
    const plain = { PORT: 3000, DB_URL: 'db://localhost', DB_PASSWORD: 'password' };

    it('should transform plain 1d object to class instance', () => {
      const instance = loader.load(TemplateMock, plain, {});
      expect(instance).toBeInstanceOf(TemplateMock);
      expect(instance.db).toBeInstanceOf(DbConfigMock);
    });

    it('should transform plain 1d object to 2d object', () => {
      const instance = loader.load(TemplateMock, plain, {});
      expect(instance.port).toEqual(plain.PORT);
      expect(instance.db).toEqual({ url: plain.DB_URL, password: plain.DB_PASSWORD });
    });
  });

  describe('2d transformation', () => {
    const plain = { port: 3000, db: { url: 'db://localhost', password: 'password' } };

    class MultiDimensionalSourceTemplateMock {
      port: number;

      @From('db.url')
      dbUrl: string;
    }

    it('should transform plain 2d object to 2d object', () => {
      const instance = loader.load(MultiDimensionalSourceTemplateMock, plain, {});
      expect(instance.port).toEqual(plain.port);
      expect(instance.dbUrl).toEqual(plain.db.url);
    });
  });

  describe('default value', () => {
    const plain = { port: 3000, db: { password: 'password' } };

    class DefaultTemplateMock {
      port: number;

      @From({ key: 'db.url', default: 'db://localhost' })
      dbUrl: string;
    }

    it('should complete with default value', () => {
      const instance = loader.load(DefaultTemplateMock, plain, {});
      expect(instance.port).toEqual(plain.port);
      expect(instance.dbUrl).toEqual('db://localhost');
    });
  });
});
