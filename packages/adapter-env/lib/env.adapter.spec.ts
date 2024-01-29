import { EnvConfigAdapter } from './env.adapter';
import * as fg from 'fast-glob';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

jest.mock('fs');
jest.mock('fast-glob');
jest.mock('dotenv');
jest.mock('dotenv-expand');

describe('EnvConfigAdapter', () => {
  jest.spyOn(fg, 'sync').mockReturnValue(['']);
  jest.spyOn(dotenv, 'parse').mockReturnValue({ someValue: 'true' });
  jest
    .spyOn(dotenvExpand, 'expand')
    .mockImplementation(
      (options: dotenvExpand.DotenvExpandOptions) => options.parsed as Record<string, string>,
    );

  it('should load config from file', () => {
    const adapter = new EnvConfigAdapter({ envFilesPaths: ['path/env'], ignoreEnvVars: true });
    const source = adapter.load();
    expect(source.someValue).toBe('true');
  });

  it('should load config from process.env', () => {
    const adapter = new EnvConfigAdapter({ envFilesPaths: ['path/env'], expandVariables: true });
    const source = adapter.load();
    expect(source.NODE_ENV).toBeDefined();
  });
});
