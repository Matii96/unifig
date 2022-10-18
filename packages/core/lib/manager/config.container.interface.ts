import { DeepReadonly } from '../utils/deep-readonly';

export interface IConfigContainer<TTemplate extends Record<string, any> = any> {
  values: DeepReadonly<TTemplate>;

  /**
   * Reload config with newest values.
   */
  refresh(): Promise<void>;
}
