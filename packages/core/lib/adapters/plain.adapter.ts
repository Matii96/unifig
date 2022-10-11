import { ConfigSource, IConfigAdapter } from './config-adapter.interface';

/**
 * Loads configuration from object.
 */
export class PlainConfigAdapter implements IConfigAdapter {
  constructor(readonly source: ConfigSource) {}

  async load() {
    return this.source;
  }
}
