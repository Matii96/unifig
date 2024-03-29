import { join } from 'path';
import { ConfigManager, ConfigManagerFactory } from '@unifig/core';
import { EnvConfigAdapter } from '../lib';
import { Settings } from './settings';

describe('@unifig/adapter-env (e2e)', () => {
  let manager: ConfigManager;

  beforeEach(() => {
    manager = ConfigManagerFactory.create();
  });

  it('should load configuration from 2 .env files', async () => {
    await manager.register({
      template: Settings,
      adapter: new EnvConfigAdapter({
        envFilesPaths: [join(__dirname, '.env'), join(__dirname, '.env.overwrite')],
        expandVariables: true,
      }),
    });

    expect(manager.getValues(Settings).port).toBe(300010);
  });

  it('should overwrite file configuration with environment variables', () => {
    process.env.PORT = '4588';

    manager.registerSync({
      template: Settings,
      adapter: new EnvConfigAdapter({ envFilesPaths: [join(__dirname, '.env')] }),
    });

    expect(manager.getValues(Settings).port).toBe(4588);

    process.env.PORT = undefined;
  });
});
