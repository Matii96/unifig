import { ConfigFunctionSyncAdapter, ConfigSyncAdapter } from '../../adapters';
import { ClassConstructor } from '../../utils/class-constructor';
import { SourceGroupOptions } from '../source-group/source-group.options';

export type ConfigManagerRegisterSyncOptions =
  | RegisterSyncSingleTemplateOptions
  | RegisterSyncMultipleTemplatesOptions;

interface RegisterTemplatesOptions extends SourceGroupOptions {
  adapter: ConfigSyncAdapter | ConfigFunctionSyncAdapter;
}

export interface RegisterSyncSingleTemplateOptions extends RegisterTemplatesOptions {
  template: ClassConstructor;
}

export interface RegisterSyncMultipleTemplatesOptions extends RegisterTemplatesOptions {
  templates: ClassConstructor[];
}
