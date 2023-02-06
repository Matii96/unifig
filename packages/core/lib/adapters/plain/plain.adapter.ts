import { ConfigSyncAdapter } from '../sync-adapter';
import { ConfigSource } from '../types';

/**
 * Loads configuration from object.
 */
export class PlainConfigAdapter implements ConfigSyncAdapter {
  private readonly _source: ConfigSource;

  constructor(source: ConfigSource) {
    this._source = source;
  }

  load() {
    return this._source;
  }
}
