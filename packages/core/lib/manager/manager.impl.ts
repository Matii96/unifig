import 'reflect-metadata';
import { ClassConstructor } from '../utils/class-constructor.interface';
import { Validator } from '../validator/validator';
import { ConfigNotInitializedException } from './exceptions/config-not-initialized.exception';
import {
  ConfigManagerRegisterOptions,
  RegisterSingleTemplateOptions,
  RegisterMultipleTemplatesOptions,
} from './manager.options';
import { SourceGroup } from './source-group/source-group';
import { sourceGroupFactory } from './source-group/source-group.factory';
import { ConfigContainer } from './container';
import { ConfigManager } from './manager';

export class InternalConfigManager implements ConfigManager {
  private readonly _groups = new Map<ClassConstructor, SourceGroup>();

  constructor(
    private readonly _validator: Validator,
    private readonly _sourceGroupFactory: typeof sourceGroupFactory
  ) {}

  async register(...options: ConfigManagerRegisterOptions[]) {
    const groups = options.map((config) => this.initSourceGroups(config));
    const loadResults = await Promise.all(groups.map((group) => group.load(true)));
    const configsValues = ([] as any[]).concat(...loadResults);

    const validationResult = this._validator.validate(configsValues);
    if (validationResult) {
      return validationResult;
    }
    groups.forEach((group) => group.templates.forEach((template) => this._groups.set(template, group)));
  }

  async registerOrReject(...configs: ConfigManagerRegisterOptions[]) {
    const validationResult = await this.register(...configs);
    if (validationResult) {
      throw validationResult;
    }
  }

  private initSourceGroups(options: ConfigManagerRegisterOptions) {
    let templates = (options as RegisterMultipleTemplatesOptions).templates;
    if (!templates) templates = [(options as RegisterSingleTemplateOptions).template];

    const sourceGroup = this._sourceGroupFactory();

    // Register only templates that were not registered already
    sourceGroup.init(
      options.adapter,
      templates.filter((template) => !this._groups.has(template)),
      options
    );
    return sourceGroup;
  }

  getValues<TTemplate extends Record<string, any>>(template: ClassConstructor<TTemplate>) {
    return this.getContainer(template).values;
  }

  getContainer<TTemplate extends Record<string, any>>(
    template: ClassConstructor<TTemplate>
  ): ConfigContainer<TTemplate> {
    const group = this._groups.get(template);
    if (!group) throw new ConfigNotInitializedException(template);
    return group.getContainer(template)!;
  }
}
