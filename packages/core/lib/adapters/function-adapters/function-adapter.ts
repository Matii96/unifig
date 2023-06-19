import { ConfigSource } from '../types';

/**
 * Loads configuration from non-blocking source.
 */
export type ConfigFunctionAdapter = () => Promise<ConfigSource>;
