import { join } from 'path';
import { readFileSync } from 'fs';
import { sync } from 'fast-glob';
import { parse } from 'dotenv';
import { expand } from 'dotenv-expand';
import { ConfigSource, ConfigSyncAdapter } from '@unifig/core';
import { EnvConfigAdapterOptions } from './env.adapter.options';

/**
 * Loads configuration from object.
 */
export class EnvConfigAdapter implements ConfigSyncAdapter {
  private readonly _options!: EnvConfigAdapterOptions;

  constructor(options: EnvConfigAdapterOptions = {}) {
    this._options = options;
  }

  load(): ConfigSource {
    const config: ReturnType<typeof parse> = {};
    const paths = [...(this._options.envFilesPaths ?? []), join(process.cwd(), '.env')].flatMap(
      (path) => sync(path, { dot: true, unique: true }),
    );

    for (const envFilePath of paths) {
      this.parseEnvFile(config, envFilePath);
    }

    if (!this._options.ignoreEnvVars) {
      Object.assign(config, process.env);
    }

    return config;
  }

  private parseEnvFile(config: ReturnType<typeof parse>, envFilePath: string) {
    Object.assign(config, parse(readFileSync(envFilePath)));

    if (!this._options.expandVariables) {
      return;
    }

    const { parsed } = expand({ parsed: config, processEnv: {} });
    if (parsed) {
      Object.assign(config, parsed);
    }
  }
}
