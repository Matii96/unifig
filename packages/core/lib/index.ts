export * from './adapters';
export * from './manager';
export * from './loader';
export * from './validator';

import { ConfigContainer } from './manager';
import { ConfigManagerFactory } from './manager/manager.factory';

/**
 * @deprecated Will be removed in v1.0.0. Renamed to `ConfigContainer`.
 */
export type IConfigContainer<TTemplate extends Record<string, any>> = ConfigContainer<TTemplate>;

/**
 * Global ConfigManager instance.
 */
export const Config = ConfigManagerFactory.create();
