import 'reflect-metadata';
import { ClassConstructor } from '../utils/class-constructor';
import { Validator } from '../validator/validator';
import { getNestedTemplates } from '../loader';
import {
  ConfigManagerRegisterOptions,
  RegisterSingleTemplateOptions,
  RegisterMultipleTemplatesOptions,
  ConfigManagerRegisterSyncOptions,
} from './options';
import { ConfigNotInitializedException } from './exceptions/config-not-initialized.exception';
import { SourceGroup } from './source-group/source-group';
import { sourceGroupFactory } from './source-group/source-group.factory';
import { ConfigContainer } from './container';
import { ConfigManager } from './manager';

export class InternalConfigManager implements ConfigManager {
  private readonly _groups = new Map<ClassConstructor, SourceGroup>();

  constructor(
    private readonly _validator: Validator,
    private readonly _sourceGroupFactory: typeof sourceGroupFactory,
  ) {}

  async register(...options: ConfigManagerRegisterOptions[]) {
    const groups = options.map((config) => this.initSourceGroups(config));
    const sources = await Promise.all(groups.map((group) => group.load(true)));
    return this.registerSourceGroupsTemplates(groups, sources);
  }

  registerSync(...options: ConfigManagerRegisterSyncOptions[]) {
    const groups = options.map((config) => this.initSourceGroups(config));
    const sources = groups.map((group) => group.loadSync(true));
    return this.registerSourceGroupsTemplates(groups, sources);
  }

  async registerOrReject(...configs: ConfigManagerRegisterOptions[]) {
    const validationResult = await this.register(...configs);
    if (validationResult) {
      throw validationResult;
    }
  }

  private registerSourceGroupsTemplates(groups: SourceGroup[], sources: object[][]) {
    const configsValues = ([] as any[]).concat(...sources);
    const validationResult = this._validator.validate(configsValues);
    if (validationResult) {
      return validationResult;
    }
    groups.forEach((group) =>
      group.templates.forEach((template) =>
        getNestedTemplates(template).forEach((template) => this._groups.set(template, group)),
      ),
    );
  }

  private initSourceGroups(options: ConfigManagerRegisterOptions) {
    let templates = (options as RegisterMultipleTemplatesOptions).templates;
    if (!templates) {
      templates = [(options as RegisterSingleTemplateOptions).template];
    }

    const sourceGroup = this._sourceGroupFactory();

    // Register only templates that were not registered already
    sourceGroup.init(
      options.adapter,
      templates.filter((template) => !this._groups.has(template)),
      options,
    );
    return sourceGroup;
  }

  getValues<TTemplate extends Record<string, any>>(template: ClassConstructor<TTemplate>) {
    return this.getContainer(template).values;
  }

  getContainer<TTemplate extends Record<string, any>>(
    template: ClassConstructor<TTemplate>,
  ): ConfigContainer<TTemplate> {
    const group = this._groups.get(template);
    if (!group) {
      throw new ConfigNotInitializedException(template);
    }
    return group.getContainer(template)!;
  }
}
