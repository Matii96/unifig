import { Type } from '../utils/type.interface';
import { IConfigAdapter } from '../adapters/config-adapter.interface';

export interface ConfigManagerRegisterSingleTemplateOptions {
  template: Type;
  adapter: IConfigAdapter;
}

export interface ConfigManagerRegisterMultipleTemplatesOptions {
  templates: Type[];
  adapter: IConfigAdapter;
}
