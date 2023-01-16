import {
  ConfigValidationError,
  PlainConfigAdapter,
  ConfigNotInitializedException,
  ConfigManager,
  ConfigManagerFactory,
} from '../lib';
import { TransformationArrayTemplate, TransformationTemplate } from './templates/transformation.template';
import { ValidationTemplate } from './templates/validation.template';

describe('@unifig/core (e2e)', () => {
  let manager: ConfigManager;

  beforeEach(() => {
    manager = ConfigManagerFactory.create();
  });

  describe('transformation', () => {
    it('should transform source to config instance', async () => {
      await manager.register({
        template: TransformationTemplate,
        adapter: new PlainConfigAdapter({
          local: { port: 3000 },
          global: { dbUrl: 'localhost:5467', dbPassword: 'password' },
        }),
      });
      expect(manager.getValues(TransformationTemplate).port).toBe(3000);
      expect(manager.getValues(TransformationTemplate).db).toEqual({ url: 'localhost:5467', password: 'password' });
    });

    it('should leave missing properties blank', async () => {
      await manager.register({
        template: TransformationTemplate,
        adapter: new PlainConfigAdapter({ local: { host: 'localhost' } }),
      });
      expect(manager.getValues(TransformationTemplate).port).not.toBeDefined();
    });

    it('should transform source to array of subtemplates', async () => {
      const ports = [{ port: 3000 }];
      await manager.register({
        template: TransformationArrayTemplate,
        adapter: new PlainConfigAdapter({ ports } satisfies TransformationArrayTemplate),
      });
      expect(manager.getValues(TransformationArrayTemplate).ports).toEqual(ports);
    });
  });

  describe('validation', () => {
    it('should accept config values', async () => {
      await manager.register({
        template: ValidationTemplate,
        adapter: new PlainConfigAdapter({ port: 3000, db: { url: 'db://localhost:5467' } }),
      });
      expect(manager.getValues(ValidationTemplate)).toBeDefined();
    });

    it('should fail to validate config', () => {
      expect(
        manager.registerOrReject({
          template: ValidationTemplate,
          adapter: new PlainConfigAdapter({ port: 3000, db: { port: 5000 } }),
        })
      ).rejects.toThrow(ConfigValidationError);
    });
  });

  describe('registration', () => {
    it('should fail to get config before initialization', () => {
      expect(() => manager.getValues(class {})).toThrow(ConfigNotInitializedException);
    });
  });
});
