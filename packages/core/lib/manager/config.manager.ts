import 'reflect-metadata';
import { Type } from '../utils/type.interface';
import { IConfigAdapter } from '../adapters/config-adapter.interface';
import { ConfigNotInitializedException } from './exceptions/config-not-initialized.exception';
import { ConfigContainer } from './config.container';

/**
 * Container and manager for configurations.
 */
export class ConfigManager {
  private readonly _instances = new Map<Type<any>, ConfigContainer>();

  async register(...configs: { template: Type<any>; adapter: IConfigAdapter }[]) {
    const newConfigs = configs.filter(({ template }) => !this._instances.has(template));
    const instances = newConfigs.map((opts) => new ConfigContainer(opts.template, opts.adapter));
    await Promise.all(instances.map((instance) => instance.refresh()));
    newConfigs.forEach((opts, idx) => this._instances.set(opts.template, instances[idx]));
  }

  /**
   * Retrieves readonly template values.
   * @param {Type<TTemplate>} template
   * @returns {TTemplate} value
   */
  values<TTemplate>(template: Type<TTemplate>) {
    return this.container(template).values;
  }

  /**
   * Retrieves container to manage configuration.
   * @param {Type<TTemplate>} template
   * @returns {ConfigContainer<TTemplate>}
   */
  container<TTemplate>(template: Type<TTemplate>) {
    const instance = this._instances.get(template) as ConfigContainer<TTemplate>;
    if (!instance) throw new ConfigNotInitializedException(template);
    return instance;
  }
}
