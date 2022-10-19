import { Type } from '../utils/type.interface';
import { IConfigAdapter } from '../adapters/config-adapter.interface';

export interface ConfigManagerRegisterSingleTemplateOptions {
  template: Type<any>;
  adapter: IConfigAdapter;
}

export interface ConfigManagerRegisterMultipleTemplatesOptions {
  templates: Type<any>[];
  adapter: IConfigAdapter;
}
