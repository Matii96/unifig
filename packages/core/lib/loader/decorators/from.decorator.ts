import { Expose } from 'class-transformer';
import { mappedPropertyKey, PROPERTIES_MAPPING_METADATA } from '../constants';
import { PropertiesMapping } from '../types';

export const From = (origin: string): PropertyDecorator => {
  return (target, key: string) => {
    let mapping: PropertiesMapping = Reflect.getMetadata(PROPERTIES_MAPPING_METADATA, target.constructor);
    if (!mapping) {
      mapping = new Map();
      Reflect.defineMetadata(PROPERTIES_MAPPING_METADATA, mapping, target.constructor);
    }
    mapping.set(key, origin);

    // Apply custom mapping to avoid original properties overwriting.
    Expose({ name: mappedPropertyKey(key) })(target, key);
  };
};
