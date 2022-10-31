import { plainToInstance } from 'class-transformer';
import { Type } from '../utils/type.interface';
import { ConfigSource, ConfigSourceEntry } from '../adapters/config-adapter.interface';
import { mappedPropertyKey, PROPERTIES_MAPPING_METADATA, PROPERTIES_NESTING_METADATA } from './constants';
import { PropertiesMapping, PropertiesNesting, PropertySource } from './types';

export class ConfigLoader {
  load<TTemplate>(template: Type<TTemplate>, source: ConfigSource) {
    const plain = this.formatObject(template, source, source);
    return plainToInstance(template, plain, { enableImplicitConversion: true });
  }

  private formatObject(template: Type, skeleton: ConfigSource, source: ConfigSource) {
    const properties: PropertiesMapping = Reflect.getMetadata(PROPERTIES_MAPPING_METADATA, template);
    if (properties) {
      for (const [targetKey, sourceKey] of properties) {
        skeleton[mappedPropertyKey(targetKey)] = this.getSourceValue(source, sourceKey);
      }
    }

    const nesting: PropertiesNesting = Reflect.getMetadata(PROPERTIES_NESTING_METADATA, template);
    if (nesting) {
      for (const [targetKey, subTemplate] of nesting) {
        skeleton[targetKey] = skeleton[targetKey] ?? {};
        Object.assign(skeleton[targetKey], this.formatObject(subTemplate, skeleton[targetKey] as ConfigSource, source));
      }
    }

    return skeleton;
  }

  private getSourceValue(source: ConfigSource, key: PropertySource) {
    if (source[key]) return source[key];
    const keyParts = key.split('.');
    let value = source as ConfigSourceEntry;
    for (const keyPart of keyParts) {
      value = (value as ConfigSource)[keyPart];
      if (typeof value === 'undefined') break;
    }
    return value;
  }
}
