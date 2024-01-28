import { ConfigAdapter, ConfigSource, TemplateAdapter } from '../../adapters';
import { Loader } from '../../loader/loader';
import { getNestedTemplates } from '../../loader';
import { PropertiesNesting } from '../../shared/types';
import { PROPERTIES_NESTING_METADATA } from '../../loader/constants';
import { ClassConstructor } from '../../utils/class-constructor';
import { Validator } from '../../validator/validator';
import { containerFactory } from '../container/container.factory';
import { EditableConfigContainer } from '../container/editable-container';
import { AdapterTypeMismatchException } from './exceptions';
import { SourceGroupOptions } from './source-group.options';
import { SourceGroup } from './source-group';

export class ConfigSourceGroup implements SourceGroup {
  private _options: SourceGroupOptions;
  private _adapter: TemplateAdapter;
  private readonly _containers = new Map<ClassConstructor, EditableConfigContainer>();
  private readonly _parentTemplates = new Set<ClassConstructor>();

  constructor(
    private readonly _loader: Loader,
    private readonly _validator: Validator,
    private readonly _containerFactory: typeof containerFactory,
  ) {}

  init(adapter: TemplateAdapter, templates: ClassConstructor[], options: SourceGroupOptions) {
    this._options = options;
    this._adapter = adapter;
    templates.forEach((template) => {
      this._parentTemplates.add(template);
      getNestedTemplates(template).forEach((template) =>
        this._containers.set(template, this._containerFactory(this)),
      );
    });
  }

  get templates() {
    return Array.from(this._containers.keys());
  }

  getContainer(template: ClassConstructor) {
    return this._containers.get(template);
  }

  /**
   * @param {boolean} skipValidation
   * @returns List of new instances of templates.
   */
  async load(skipValidation = false) {
    const source = await this.getFactoryMethod(this._adapter)();
    return this.loadFromSource(source, skipValidation);
  }

  /**
   * @param {boolean} skipValidation
   * @returns List of new instances of templates.
   */
  loadSync(skipValidation = false) {
    const source = this.getFactoryMethod(this._adapter)();
    if (source instanceof Promise) {
      throw new AdapterTypeMismatchException(
        this._adapter.constructor as ClassConstructor<ConfigAdapter>,
      );
    }
    return this.loadFromSource(source, skipValidation);
  }

  private getFactoryMethod(
    adapter: TemplateAdapter,
  ): (() => Promise<ConfigSource>) | (() => ConfigSource) {
    return typeof adapter === 'function' ? adapter : adapter.load.bind(adapter);
  }

  private loadFromSource(source: ConfigSource, skipValidation: boolean) {
    const parents = Array.from(this._parentTemplates);
    const values = parents.map((template) => this._loader.load(template, source, this._options));

    if (!skipValidation) {
      const validationResult = this._validator.validate(values);
      if (validationResult) {
        throw validationResult;
      }
    }

    parents.forEach((template, idx) => this.setContainerValues(template, values[idx]));

    return values;
  }

  private setContainerValues(template: ClassConstructor, values: any) {
    const container = this.getContainer(template) as EditableConfigContainer<any>;
    container.setValues(values);

    const nesting: PropertiesNesting = Reflect.getMetadata(PROPERTIES_NESTING_METADATA, template);
    if (!nesting) {
      return;
    }
    for (const [targetKey, getSubTemplate] of nesting) {
      const value = values[targetKey];
      if (value) {
        this.setContainerValues(getSubTemplate(), value);
      }
    }
  }
}
