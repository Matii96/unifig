import { Type as TransformType } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Type } from '../../utils/type.interface';
import { PROPERTIES_NESTING_METADATA } from '../constants';
import { PropertiesNesting } from '../types';

export const Nested = <T>(type: Type<T>): PropertyDecorator => {
  return (target, key: string) => {
    let mapping: PropertiesNesting = Reflect.getMetadata(PROPERTIES_NESTING_METADATA, target.constructor);
    if (!mapping) {
      mapping = new Map();
      Reflect.defineMetadata(PROPERTIES_NESTING_METADATA, mapping, target.constructor);
    }
    mapping.set(key, type);

    TransformType(() => type);
    ValidateNested()(target, key);
  };
};
