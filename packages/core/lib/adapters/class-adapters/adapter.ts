import { ConfigSource } from '../types';

export interface ConfigAdapter {
  /**
   * Loads configuration from non-blocking source.
   */
  load(): Promise<ConfigSource>;
}
