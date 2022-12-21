import { ConfigAdapter, ConfigSource } from '../adapter';

/**
 * Loads configuration from object.
 */
export class PlainConfigAdapter implements ConfigAdapter {
  private readonly _source: ConfigSource;

  constructor(source: ConfigSource) {
    this._source = source;
  }

  async load() {
    return this._source;
  }
}
