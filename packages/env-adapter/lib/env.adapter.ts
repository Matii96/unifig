import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';
import { parse } from 'dotenv';
import { expand } from 'dotenv-expand';
import { ConfigSource, IConfigAdapter } from '@unifig/core';
import { EnvConfigAdapterOptions } from './env.adapter.options';

/**
 * Loads configuration from object.
 */
export class EnvConfigAdapter implements IConfigAdapter {
  private readonly _options!: EnvConfigAdapterOptions;
  private readonly _envFilesPaths!: string[];

  constructor(options: EnvConfigAdapterOptions = {}) {
    this._options = options;
    this._envFilesPaths = [...(options.envFilesPaths ?? []), resolve(process.cwd(), '.env')];
  }

  async load(): Promise<ConfigSource> {
    let config: ReturnType<typeof parse> = {};
    for (const envFilePath of this._envFilesPaths) {
      if (!existsSync(envFilePath)) {
        continue;
      }
      config = Object.assign(config, parse(readFileSync(envFilePath)));
      if (this._options.expandVariables) {
        config = expand({ parsed: config }).parsed || config;
      }
    }
    if (!this._options.ignoreEnvVars) {
      Object.assign(config, process.env);
    }
    return config;
  }
}
