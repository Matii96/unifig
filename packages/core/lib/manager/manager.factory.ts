import 'reflect-metadata';
import { ClassValidator } from '../validator/validator.impl';
import { sourceGroupFactory } from './source-group/source-group.factory';
import { InternalConfigManager } from './manager.impl';
import { ConfigManager } from './manager';

export class ConfigManagerFactory {
  static create(): ConfigManager {
    const validator = new ClassValidator();
    return new InternalConfigManager(validator, sourceGroupFactory);
  }
}
