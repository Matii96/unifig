import { ConfigAdapter, ConfigSyncAdapter } from './class-adapters';
import { ConfigFunctionAdapter, ConfigFunctionSyncAdapter } from './function-adapters';

export type ConfigSource = { [key: string]: ConfigSourceEntry };
export type ConfigSourceEntry = string | number | boolean | ConfigSource | Array<ConfigSourceEntry>;

export type TemplateAdapter =
  | ConfigSyncAdapter
  | ConfigAdapter
  | ConfigFunctionSyncAdapter
  | ConfigFunctionAdapter;
