import { ConfigSource } from './types';

export interface ConfigAdapter {
  /**
   * Loads configuration from source.
   */
  load(): Promise<ConfigSource>;
}
