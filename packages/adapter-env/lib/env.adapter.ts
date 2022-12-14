import { join } from 'path';
import { readFileSync } from 'fs';
import * as fg from 'fast-glob';
import { parse } from 'dotenv';
import { expand } from 'dotenv-expand';
import { ConfigSource, ConfigAdapter } from '@unifig/core';
import { EnvConfigAdapterOptions } from './env.adapter.options';

/**
 * Loads configuration from object.
 */
export class EnvConfigAdapter implements ConfigAdapter {
  private readonly _options!: EnvConfigAdapterOptions;
  private readonly _envFilesPaths!: string[];

  constructor(options: EnvConfigAdapterOptions = {}) {
    this._options = options;
    this._envFilesPaths = [...(options.envFilesPaths ?? []), join(process.cwd(), '.env')];
  }

  async load(): Promise<ConfigSource> {
    const config: ReturnType<typeof parse> = {};
    const paths = await fg(this._envFilesPaths, { dot: true, unique: true });
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
    if (this._options.expandVariables) {
      Object.assign(config, expand({ parsed: config, ignoreProcessEnv: true }).parsed || config);
    }
  }
}
