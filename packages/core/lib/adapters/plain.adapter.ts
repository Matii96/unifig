import { ConfigSource, IConfigAdapter } from './config-adapter.interface';

/**
 * Loads configuration from object.
 */
export class PlainConfigAdapter implements IConfigAdapter {
  private readonly _source: ConfigSource;

  constructor(source: ConfigSource) {
    this._source = source;
  }

  async load() {
    return this._source;
  }
}
