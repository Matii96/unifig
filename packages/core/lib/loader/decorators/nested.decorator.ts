import { Type as TransformType } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Type } from '../../utils/type.interface';
import { PROPERTIES_NESTING_METADATA } from '../constants';
import { PropertiesNesting } from '../types';

// eslint-disable-next-line @typescript-eslint/ban-types
function isClass(func: Function) {
  return typeof func === 'function' && /^class\s/.test(Function.prototype.toString.call(func));
}

/**
 * @deprecated Support for passing subtemplate class directly will be removed in v1.0.0. Instead, pass a factory function: `@Nested(() => SubClass)`. This is because of `SubClass` reference being undefined when parent and child templates reference each other in a circular way.
 * @param {Type<T>} type
 */
export function Nested<T>(type: Type<T>): PropertyDecorator;
export function Nested<T>(type: () => Type<T>): PropertyDecorator;

export function Nested<T>(type: Type<T> | (() => Type<T>)): PropertyDecorator {
  return (target, key: string) => {
    const typeLambda = isClass(type) ? () => type as Type<T> : (type as () => Type<T>);

    let mapping: PropertiesNesting = Reflect.getMetadata(PROPERTIES_NESTING_METADATA, target.constructor);
    if (!mapping) {
      mapping = new Map();
      Reflect.defineMetadata(PROPERTIES_NESTING_METADATA, mapping, target.constructor);
    }
    mapping.set(key, typeLambda);

    TransformType(typeLambda)(target, key);
    ValidateNested()(target, key);
  };
}
