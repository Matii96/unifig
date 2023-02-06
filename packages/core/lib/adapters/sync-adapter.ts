import { ConfigSource } from './types';

export interface ConfigSyncAdapter {
  /**
   * Loads configuration from source.
   */
  load(): ConfigSource;
}
