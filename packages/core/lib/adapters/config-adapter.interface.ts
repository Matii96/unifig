export type ConfigSource = { [key: string]: ConfigSourceEntry };
export type ConfigSourceEntry = string | number | boolean | ConfigSource;

export interface IConfigAdapter {
  /**
   * Loads configuration from source.
   */
  load(): Promise<ConfigSource>;
}
