import {
  ConfigValidationError,
  PlainConfigAdapter,
  ConfigNotInitializedException,
  ConfigManager,
  ConfigManagerFactory,
} from '../lib';
import {
  TransformationArrayTemplate,
  TransformationTemplate,
} from './templates/transformation.template';
import { ValidationTemplate, DbConfig } from './templates/validation.template';

describe('@unifig/core (e2e)', () => {
  let manager: ConfigManager;

  beforeEach(() => {
    manager = ConfigManagerFactory.create();
  });

  describe('transformation', () => {
    describe('plain source', () => {
      const source = {
        local: { port: 3000 },
        global: { dbUrl: 'localhost:5467', dbPassword: 'password' },
      };

      it('should async transform source to config instance', async () => {
        await manager.register({
          template: TransformationTemplate,
          adapter: new PlainConfigAdapter(source),
        });
        expect(manager.getValues(TransformationTemplate).port).toBe(source.local.port);
        expect(manager.getValues(TransformationTemplate).db).toEqual({
          url: source.global.dbUrl,
          password: source.global.dbPassword,
        });
      });

      it('should sync transform source to config instance', () => {
        manager.registerSync({
          template: TransformationTemplate,
          adapter: new PlainConfigAdapter(source),
        });
        expect(manager.getValues(TransformationTemplate).port).toBe(source.local.port);
        expect(manager.getValues(TransformationTemplate).db).toEqual({
          url: source.global.dbUrl,
          password: source.global.dbPassword,
        });
      });
    });

    it('should convert port type', async () => {
      await manager.register({
        template: TransformationTemplate,
        adapter: () => ({ local: { port: '3000' } }),
      });
      expect(manager.getValues(TransformationTemplate).port).toBe(3000);
    });

    it('should not convert port type', async () => {
      await manager.register({
        template: TransformationTemplate,
        enableImplicitConversion: false,
        adapter: () => ({ local: { port: '3000' } }),
      });
      expect(manager.getValues(TransformationTemplate).port).toBe('3000');
    });

    it('should leave missing properties blank', async () => {
      await manager.register({
        template: TransformationTemplate,
        adapter: () => ({ local: { host: 'localhost' } }),
      });
      expect(manager.getValues(TransformationTemplate).port).not.toBeDefined();
    });

    it('should transform source to array of subtemplates', async () => {
      const ports = [{ port: 3000 }];
      await manager.register({
        template: TransformationArrayTemplate,
        adapter: () => ({ ports }) satisfies TransformationArrayTemplate,
      });
      expect(manager.getValues(TransformationArrayTemplate).ports).toEqual(ports);
    });
  });

  describe('validation', () => {
    it('should accept config values', async () => {
      await manager.register({
        template: ValidationTemplate,
        adapter: () => ({ port: 3000, db: { url: 'db://localhost:5467' } }),
      });
      expect(manager.getValues(ValidationTemplate)).toBeDefined();
    });

    it('should fail to validate config', () => {
      expect(
        manager.registerOrReject({
          template: ValidationTemplate,
          adapter: () => ({ port: 3000, db: { port: 5000 } }),
        }),
      ).rejects.toThrow(ConfigValidationError);
    });
  });

  describe('registration', () => {
    it('should register and access sub template ', () => {
      manager.registerSync({
        template: ValidationTemplate,
        adapter: () => ({ port: 3000, db: { url: 'db://localhost:5467' } }),
      });
      expect(manager.getValues(DbConfig)).toEqual({ url: 'db://localhost:5467' });
    });

    it('should fail to get config before initialization', () => {
      expect(() => manager.getValues(class {})).toThrow(ConfigNotInitializedException);
    });
  });
});
