import { Type } from '../utils/type.interface';

export type PropertySource = string;
export type PropertyTarget = string;
export type PropertiesMapping = Map<PropertyTarget, PropertySource>;
export type PropertiesNesting = Map<PropertyTarget, () => Type>;
