import { Type } from '../../utils/type.interface';
import { ConfigLoader } from '../../loader/config.loader';
import { ConfigValidator } from '../../validator/config.validator';
import { IConfigAdapter } from '../../adapters/config-adapter.interface';
import { ConfigContainer } from '../container/config.container';

export class ConfigSourceGroup {
  private readonly _loader = new ConfigLoader();
  private readonly _validator = new ConfigValidator();
  private readonly _adapter: IConfigAdapter;
  private readonly _containers = new Map<Type, ConfigContainer>();

  constructor(adapter: IConfigAdapter, templates: Type[]) {
    this._adapter = adapter;
    templates.forEach((template) => this._containers.set(template, new ConfigContainer(this)));
  }

  get templates() {
    return Array.from(this._containers.keys());
  }

  getContainer(template: Type) {
    return this._containers.get(template);
  }

  /**
   * @param {boolean} skipValidation
   * @returns List of new instances of templates.
   */
  async load(skipValidation = false) {
    const source = await this._adapter.load();
    const values = this.templates.map((template) => this._loader.load(template, source));
    if (!skipValidation) this._validator.validate(values);
    this.templates.forEach((template, idx) =>
      (this.getContainer(template) as ConfigContainer<any>).setValue(values[idx])
    );
    return values;
  }
}
