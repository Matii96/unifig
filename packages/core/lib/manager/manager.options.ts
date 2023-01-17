import { ConfigAdapter } from '../adapters';
import { ClassConstructor } from '../utils/class-constructor.interface';
import { SourceGroupOptions } from './source-group/source-group.options';

export type ConfigManagerRegisterOptions = RegisterSingleTemplateOptions | RegisterMultipleTemplatesOptions;

interface RegisterTemplatesOptions extends SourceGroupOptions {
  adapter: ConfigAdapter;
}

export interface RegisterSingleTemplateOptions extends RegisterTemplatesOptions {
  template: ClassConstructor;
}

export interface RegisterMultipleTemplatesOptions extends RegisterTemplatesOptions {
  templates: ClassConstructor[];
}
