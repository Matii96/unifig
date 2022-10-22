import { Type } from '../utils/type.interface';
import { IConfigAdapter } from '../adapters/config-adapter.interface';

export type ConfigManagerRegisterOptions = RegisterSingleTemplateOptions | RegisterMultipleTemplatesOptions;

export interface RegisterSingleTemplateOptions {
  template: Type;
  adapter: IConfigAdapter;
}

export interface RegisterMultipleTemplatesOptions {
  templates: Type[];
  adapter: IConfigAdapter;
}
