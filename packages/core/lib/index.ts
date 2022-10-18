export * from './adapters';
export * from './manager';
export * from './loader';
export * from './validator';

import { ConfigManager } from './manager';
/**
 * Global ConfigManager instance.
 */
export const Config = new ConfigManager();
