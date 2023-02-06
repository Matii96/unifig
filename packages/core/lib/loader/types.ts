import { ClassConstructor } from '../utils/class-constructor';
import { Flavor } from '../utils/flavor';

export type PropertySource = Flavor<string, 'propertySource'>;
export type PropertyTarget = Flavor<string, 'propertyTarget'>;
export type PropertiesMapping = Map<PropertyTarget, PropertySource>;
export type PropertiesNesting = Map<PropertyTarget, () => ClassConstructor>;
