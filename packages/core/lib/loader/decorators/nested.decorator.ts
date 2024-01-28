import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ClassConstructor } from '../../utils/class-constructor';
import { PROPERTIES_NESTING_METADATA } from '../constants';
import { PropertiesNesting } from '../../shared/types';

export function Nested<T>(type: () => ClassConstructor<T>): PropertyDecorator {
  return (target, key: string) => {
    let mapping: PropertiesNesting = Reflect.getMetadata(
      PROPERTIES_NESTING_METADATA,
      target.constructor,
    );
    if (!mapping) {
      mapping = new Map();
      Reflect.defineMetadata(PROPERTIES_NESTING_METADATA, mapping, target.constructor);
    }
    mapping.set(key, type);

    Type(type)(target, key);
    ValidateNested()(target, key);
  };
}
