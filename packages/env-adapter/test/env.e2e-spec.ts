import { join } from 'path';
import { ConfigManager } from '@unifig/core';
import { EnvConfigAdapter } from '../lib';
import { Settings } from './settings';

describe('@unifig/env (e2e)', () => {
  let manager: ConfigManager;

  beforeEach(() => {
    manager = new ConfigManager();
  });

  it('should load configuration from 2 .env files', async () => {
    await manager.register({
      template: Settings,
      adapter: new EnvConfigAdapter({
        envFilesPaths: [join(__dirname, '.env'), join(__dirname, '.env.overwrite')],
      }),
    });
    expect(manager.get(Settings).port).toBe(3000);
  });

  it('should overwrite file configuration with environment variables', async () => {
    process.env.PORT = '4588';
    await manager.register({
      template: Settings,
      adapter: new EnvConfigAdapter({
        envFilesPaths: [join(__dirname, '.env')],
      }),
    });
    expect(manager.get(Settings).port).toBe(4588);
    process.env.PORT = undefined;
  });
});
