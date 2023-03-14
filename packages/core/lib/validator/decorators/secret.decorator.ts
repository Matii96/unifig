import { SECRET_PROPERTY_METADATA } from '../constants';

export function Secret(): PropertyDecorator {
  return (target, key) => {
    Reflect.defineMetadata(SECRET_PROPERTY_METADATA, true, target.constructor, key);
  };
}
