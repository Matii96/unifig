import { plainToInstance, plainToClass } from 'class-transformer';
import { ClassConstructor } from '../utils/class-constructor.interface';
import { overrideObject } from '../utils/override-object/override-object';
import { ConfigSource, ConfigSourceEntry } from '../adapters/adapter';
import { mappedPropertyKey, PROPERTIES_MAPPING_METADATA, PROPERTIES_NESTING_METADATA } from './constants';
import { PropertiesMapping, PropertiesNesting, PropertySource } from './types';
import { LoaderOptions } from './loader.options';
import { Loader } from './loader';

export class ConfigLoader implements Loader {
  load<TTemplate>(template: ClassConstructor<TTemplate>, source: ConfigSource, options: LoaderOptions) {
    const plain = this.formatObject(template, overrideObject({}, source), source);
    return (plainToInstance ?? plainToClass)(template, plain, {
      enableImplicitConversion: options.enableImplicitConversion ?? true,
      enableCircularCheck: true,
    });
  }

  private formatObject(template: ClassConstructor, skeleton: ConfigSource, source: ConfigSource) {
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
        Object.assign(
          skeleton[targetKey],
          this.formatObject(subTemplate(), skeleton[targetKey] as ConfigSource, source)
        );
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
