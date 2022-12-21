import { ConfigAdapter } from '../adapters';
import { ClassConstructor } from '../utils/class-constructor.interface';

export type ConfigManagerRegisterOptions = RegisterSingleTemplateOptions | RegisterMultipleTemplatesOptions;

export interface RegisterSingleTemplateOptions {
  template: ClassConstructor;
  adapter: ConfigAdapter;
}

export interface RegisterMultipleTemplatesOptions {
  templates: ClassConstructor[];
  adapter: ConfigAdapter;
}
