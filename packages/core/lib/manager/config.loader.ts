import { plainToInstance } from 'class-transformer';
import { Type } from '../utils/type.interface';
import { PropertiesMapping, PropertiesNesting, PropertySource } from '../properties-mapping/types';
import { ConfigSource, ConfigSourceEntry } from '../adapters/config-adapter.interface';
import {
  mappedPropertyKey,
  PROPERTIES_MAPPING_METADATA,
  PROPERTIES_NESTING_METADATA,
} from '../properties-mapping/constants';

export class ConfigLoader<TTemplate> {
  private readonly _template: Type<TTemplate>;

  constructor(template: Type<TTemplate>) {
    this._template = template;
  }

  load(source: ConfigSource) {
    const plain = this.formatObject(this._template, source, source);
    return plainToInstance(this._template, plain, { enableImplicitConversion: true });
  }

  private formatObject(template: Type<any>, skeleton: ConfigSource, source: ConfigSource) {
    const properties: PropertiesMapping = Reflect.getMetadata(PROPERTIES_MAPPING_METADATA, template);
    if (!properties) {
      return skeleton;
    }
    for (const [targetKey, sourceKey] of properties) {
      skeleton[mappedPropertyKey(targetKey)] = this.getSourceValue(source, sourceKey);
    }

    const nesting: PropertiesNesting = Reflect.getMetadata(PROPERTIES_NESTING_METADATA, template);
    if (!nesting) {
      return skeleton;
    }
    for (const [targetKey, subTemplate] of nesting) {
      skeleton[targetKey] = skeleton[targetKey] ?? {};
      Object.assign(skeleton[targetKey], this.formatObject(subTemplate, skeleton[targetKey] as ConfigSource, source));
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
