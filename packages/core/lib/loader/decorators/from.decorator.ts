import { Expose, Transform } from 'class-transformer';
import { mappedPropertyKey, PROPERTIES_MAPPING_METADATA } from '../constants';
import { PropertiesMapping } from '../types';

interface FromOptions {
  key: string;
  default?: any;
}

export function From(key: string): PropertyDecorator;
export function From(args: FromOptions): PropertyDecorator;

export function From(args: FromOptions | string): PropertyDecorator {
  const options = typeof args === 'string' ? { key: args } : args;

  return (target, key: string) => {
    let mapping: PropertiesMapping = Reflect.getMetadata(PROPERTIES_MAPPING_METADATA, target.constructor);
    if (!mapping) {
      mapping = new Map();
      Reflect.defineMetadata(PROPERTIES_MAPPING_METADATA, mapping, target.constructor);
    }
    mapping.set(key, options.key);

    Transform(({ value }) => value ?? options.default)(target, key);
    // Apply custom mapping to avoid original properties overwriting.
    Expose({ name: mappedPropertyKey(key) })(target, key);
  };
}
