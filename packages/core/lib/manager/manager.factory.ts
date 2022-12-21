import 'reflect-metadata';
import { ConfigLoader } from '../loader/loader.impl';
import { ConfigValidator } from '../validator/validator.impl';
import { containerFactory } from './container/container.factory';
import { sourceGroupFactory } from './source-group/source-group.factory';
import { InternalConfigManager } from './manager.impl';
import { ConfigManager } from './manager';

export class ConfigManagerFactory {
  static create(): ConfigManager {
    const validator = new ConfigValidator();
    const loader = new ConfigLoader();
    return new InternalConfigManager(validator, loader, containerFactory, sourceGroupFactory);
  }
}
