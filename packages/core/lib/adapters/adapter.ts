export type ConfigSource = { [key: string]: ConfigSourceEntry };
export type ConfigSourceEntry = string | number | boolean | ConfigSource;

export interface ConfigAdapter {
  /**
   * Loads configuration from source.
   */
  load(): Promise<ConfigSource>;
}
