import { ConfigSource } from '../types';

/**
 * Loads configuration from source.
 */
export type ConfigFunctionSyncAdapter = () => ConfigSource;
