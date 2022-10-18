import { Type } from '../utils/type.interface';
import { IConfigAdapter } from '../adapters/config-adapter.interface';
import { ConfigValidator } from '../validator/config.validator';
import { ConfigContainer } from './config.container';
import { ConfigLoader } from '../loader/config.loader';

export class ConfigSourceGroup {
  private readonly _validator = new ConfigValidator();
  private readonly _loader = new ConfigLoader();
  private readonly _adapter: IConfigAdapter;
  private readonly _containers = new Map<Type<any>, ConfigContainer>();

  constructor(adapter: IConfigAdapter, templates: Type<any>[]) {
    this._adapter = adapter;
    templates.forEach((template) => this._containers.set(template, new ConfigContainer(this)));
  }

  async refresh(skipValidation = false) {
    const source = await this._adapter.load();
    const templates = Array.from(this._containers.keys());
    const values = templates.map((template) => this._loader.load(template, source));
    if (!skipValidation) this._validator.validate(values);
    templates.forEach((template, idx) => this._containers.get(template).setValue(values[idx]));
  }
}
