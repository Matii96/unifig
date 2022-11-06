import 'reflect-metadata';
import { Type } from '../utils/type.interface';
import { ConfigValidator } from '../validator/config.validator';
import { ConfigNotInitializedException } from './exceptions/config-not-initialized.exception';
import { ConfigSourceGroup } from './source-group/config.source-group';
import { IConfigContainer } from './container/config.container.interface';
import {
  ConfigManagerRegisterOptions,
  RegisterSingleTemplateOptions,
  RegisterMultipleTemplatesOptions,
} from './config.manager.options';
import { ConfigContainer } from './container/config.container';

export class ConfigManager {
  private readonly _validator = new ConfigValidator();
  private readonly _groups = new Map<Type, ConfigSourceGroup>();

  async register(...configs: ConfigManagerRegisterOptions[]) {
    const groups = configs.map((config) => this.initSourceGroup(config));
    const loadResults = await Promise.all(groups.map((group) => group.load(true)));
    const configsValues = ([] as any[]).concat(...loadResults);
    this._validator.validate(configsValues);
    groups.forEach((group) => group.templates.forEach((template) => this._groups.set(template, group)));
  }

  private initSourceGroup(config: ConfigManagerRegisterOptions) {
    let templates = (config as RegisterMultipleTemplatesOptions).templates;
    if (!templates) templates = [(config as RegisterSingleTemplateOptions).template];
    return new ConfigSourceGroup(
      config.adapter,
      templates.filter((template) => !this._groups.has(template))
    );
  }

  /**
   * Retrieves readonly template values.
   * @param {Type<TTemplate>} template
   * @returns {TTemplate} value
   */
  getValues<TTemplate extends Record<string, any>>(template: Type<TTemplate>) {
    return this.getContainer(template).values;
  }

  /**
   * Retrieves container to manage configuration.
   * @param {Type<TTemplate>} template
   * @returns {ConfigContainer<TTemplate>}
   */
  getContainer<TTemplate extends Record<string, any>>(template: Type<TTemplate>): IConfigContainer<TTemplate> {
    const group = this._groups.get(template);
    if (!group) throw new ConfigNotInitializedException(template);
    return group.getContainer(template) as ConfigContainer<TTemplate>;
  }
}
