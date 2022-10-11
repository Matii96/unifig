export interface EnvConfigAdapterOptions {
  /**
   * Path to optional environment files to be loaded in given order. Values from them will be overwritten by process envs.
   */
  envFilesPaths?: string[];

  /**
   * If "true", environment variables will not be loaded.
   */
  ignoreEnvVars?: boolean;

  /**
   * See https://www.npmjs.com/package/dotenv-expand.
   */
  expandVariables?: boolean;
}
