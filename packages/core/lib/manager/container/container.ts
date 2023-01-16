import { DeepReadonly } from '../../utils/deep-readonly/deep-readonly';

export interface ConfigContainer<TTemplate extends Record<string, any> = any> {
  values: DeepReadonly<TTemplate>;

  /**
   * Reload config with newest values.
   */
  refresh(): Promise<void>;
}
