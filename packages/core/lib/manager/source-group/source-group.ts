import { TemplateAdapter } from '../../adapters';
import { ClassConstructor } from '../../utils/class-constructor';
import { EditableConfigContainer } from '../container/editable-container';
import { SourceGroupOptions } from './source-group.options';

export interface SourceGroup {
  readonly templates: ClassConstructor<any>[];
  init(adapter: TemplateAdapter, templates: ClassConstructor[], options: SourceGroupOptions): void;
  getContainer(template: ClassConstructor): EditableConfigContainer<any> | undefined;
  load(skipValidation?: boolean): Promise<object[]>;
  loadSync(skipValidation?: boolean): object[];
}
