import { ConfigManager, ConfigValidationException, PlainConfigAdapter } from '../lib';
import { ConfigNotInitializedException } from '../lib/manager/exceptions/config-not-initialized.exception';
import { TransformationTemplate } from './templates/transformation.template';
import { ValidationTemplate } from './templates/validation.template';

describe('@unifig/core (e2e)', () => {
  let manager: ConfigManager;

  beforeEach(() => {
    manager = new ConfigManager();
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
      expect(manager.get(TransformationTemplate).port).toBe(3000);
      expect(manager.get(TransformationTemplate).db).toEqual({ url: 'localhost:5467', password: 'password' });
    });

    it('should leave missing properties blank', async () => {
      await manager.register({
        template: TransformationTemplate,
        adapter: new PlainConfigAdapter({
          local: { host: 'localhost' },
          global: { dbUrl: 'localhost:5467', dbPassword: 'password' },
        }),
      });
      expect(manager.get(TransformationTemplate).port).not.toBeDefined();
    });
  });

  describe('validation', () => {
    it('should accept config values', async () => {
      await manager.register({
        template: ValidationTemplate,
        adapter: new PlainConfigAdapter({
          port: 3000,
          db: { url: 'db://localhost:5467' },
        }),
      });
      expect(manager.get(ValidationTemplate)).toBeDefined();
    });

    it('should fail to validate config', () => {
      expect(
        manager.register({
          template: ValidationTemplate,
          adapter: new PlainConfigAdapter({
            port: 3000,
            db: { port: 5000 },
          }),
        })
      ).rejects.toThrow(ConfigValidationException);
    });
  });

  describe('registration', () => {
    it('should fail to get config before initialization', () => {
      expect(() => manager.get(class {})).toThrow(ConfigNotInitializedException);
    });
  });
});
