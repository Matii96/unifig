import { plainToInstance, plainToClass } from 'class-transformer';
import { ClassConstructor } from '../utils/class-constructor';
import { overrideObject } from '../utils/override-object/override-object';
import { ConfigSource, ConfigSourceEntry } from '../adapters/types';
import { PROPERTIES_MAPPING_METADATA, PROPERTIES_NESTING_METADATA } from './constants';
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
    const mapping: PropertiesMapping = Reflect.getMetadata(PROPERTIES_MAPPING_METADATA, template);
    if (mapping) {
      for (const [targetKey, sourceKey] of mapping) {
        skeleton[targetKey] = this.getSourceValue(source, sourceKey);
      }
    }

    const nesting: PropertiesNesting = Reflect.getMetadata(PROPERTIES_NESTING_METADATA, template);
    if (nesting) {
      for (const [targetKey, getSubTemplate] of nesting) {
        this.formatSubObject(targetKey, getSubTemplate, skeleton, source);
      }
    }

    return skeleton;
  }

  private formatSubObject(
    targetKey: string,
    getSubTemplate: () => ClassConstructor,
    skeleton: ConfigSource,
    source: ConfigSource
  ) {
    const subTemplate = getSubTemplate();
    const skeletonValue = skeleton[targetKey];

    if (Array.isArray(skeletonValue)) {
      for (const idx in skeletonValue) {
        Object.assign(skeletonValue[idx], this.formatObject(subTemplate, skeletonValue[idx] as ConfigSource, source));
      }
    } else {
      skeleton[targetKey] = skeletonValue ?? {};
      Object.assign(skeleton[targetKey], this.formatObject(subTemplate, skeleton[targetKey] as ConfigSource, source));
    }
  }

  private getSourceValue(source: ConfigSource, key: PropertySource) {
    if (source[key]) {
      return source[key];
    }

    const keyParts = key.split('.');
    let value = source as ConfigSourceEntry;
    for (const keyPart of keyParts) {
      value = (value as ConfigSource)[keyPart];
      if (typeof value === 'undefined') break;
    }
    return value;
  }
}
