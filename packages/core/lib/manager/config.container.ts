import { Type } from '../utils/type.interface';
import { deepReadonly } from '../utils/deep-readonly';
import { ConfigValidator } from '../validator/config.validator';
import { IConfigAdapter } from '../adapters/config-adapter.interface';
import { ConfigLoader } from './config.loader';

export class ConfigContainer<TTemplate extends Record<string, any> = any> {
  private readonly _validator = new ConfigValidator();
  private readonly _loader: ConfigLoader<TTemplate>;
  private readonly _adapter: IConfigAdapter;
  private _value: TTemplate;

  constructor(template: Type<TTemplate>, adapter: IConfigAdapter) {
    this._loader = new ConfigLoader(template);
    this._adapter = adapter;
  }

  get values() {
    return deepReadonly(this._value);
  }

  /**
   * Reload config values.
   */
  async refresh() {
    const source = await this._adapter.load();
    const value = this._loader.load(source);
    this._validator.validate(value);
    this._value = value;
  }
}
