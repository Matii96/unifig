export * from './adapters';
export * from './manager';
export * from './properties-mapping';
export * from './validator';

import { ConfigManager } from './manager';
/**
 * Global ConfigManager instance.
 */
export const Config = new ConfigManager();
