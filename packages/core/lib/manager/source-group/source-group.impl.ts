import { ConfigAdapter } from '../../adapters';
import { Loader } from '../../loader/loader';
import { ClassConstructor } from '../../utils/class-constructor.interface';
import { Validator } from '../../validator/validator';
import { containerFactory } from '../container/container.factory';
import { EditableConfigContainer } from '../container/editable-container';
import { SourceGroup } from './source-group';

export class ConfigSourceGroup implements SourceGroup {
  private _adapter: ConfigAdapter;
  private readonly _containers = new Map<ClassConstructor, EditableConfigContainer>();

  constructor(
    private readonly _loader: Loader,
    private readonly _validator: Validator,
    private readonly _containerFactory: typeof containerFactory
  ) {}

  init(adapter: ConfigAdapter, templates: ClassConstructor[]) {
    this._adapter = adapter;
    templates.forEach((template) => this._containers.set(template, this._containerFactory(this)));
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
    const source = await this._adapter.load();
    const values = this.templates.map((template) => this._loader.load(template, source));
    if (!skipValidation) {
      const validationResult = this._validator.validate(values);
      if (validationResult) throw validationResult;
    }
    this.templates.forEach((template, idx) =>
      (this.getContainer(template) as EditableConfigContainer<any>).setValues(values[idx])
    );
    return values;
  }
}
