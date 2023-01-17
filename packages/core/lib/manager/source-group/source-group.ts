import { ConfigAdapter } from '../../adapters';
import { ClassConstructor } from '../../utils/class-constructor.interface';
import { EditableConfigContainer } from '../container/editable-container';
import { SourceGroupOptions } from './source-group.options';

export interface SourceGroup {
  readonly templates: ClassConstructor<any>[];
  init(adapter: ConfigAdapter, templates: ClassConstructor[], options: SourceGroupOptions): void;
  getContainer(template: ClassConstructor): EditableConfigContainer<any> | undefined;
  load(skipValidation?: boolean): Promise<any[]>;
}
