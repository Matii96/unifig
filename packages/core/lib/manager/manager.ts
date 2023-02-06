import { DeepReadonly } from '../utils';
import { ClassConstructor } from '../utils/class-constructor';
import { ConfigValidationError } from '../validator';
import { ConfigManagerRegisterSyncOptions, ConfigManagerRegisterOptions } from './options';
import { ConfigContainer } from './container';

export interface ConfigManager {
  register(...configs: ConfigManagerRegisterOptions[]): Promise<ConfigValidationError | undefined>;
  registerSync(...configs: ConfigManagerRegisterSyncOptions[]): ConfigValidationError | undefined;
  registerOrReject(...configs: ConfigManagerRegisterOptions[]): Promise<void>;

  /**
   * Retrieves readonly template values.
   * @param {Type<TTemplate>} template
   * @returns {TTemplate} value
   */
  getValues<TTemplate extends Record<string, any>>(template: ClassConstructor<TTemplate>): DeepReadonly<TTemplate>;

  /**
   * Retrieves container to manage configuration.
   * @param {Type<TTemplate>} template
   * @returns {ConfigContainer<TTemplate>}
   */
  getContainer<TTemplate extends Record<string, any>>(
    template: ClassConstructor<TTemplate>
  ): ConfigContainer<TTemplate>;
}
