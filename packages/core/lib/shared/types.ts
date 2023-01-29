import { ClassConstructor } from '../utils/class-constructor.interface';

export type PropertySource = string;
export type PropertyTarget = string;
export type PropertyType = string;
export type PropertiesMapping = Map<PropertyTarget, PropertySource>;
export type PropertiesNesting = Map<PropertyTarget, () => ClassConstructor>;
