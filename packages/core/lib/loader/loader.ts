import { ConfigSource } from '../adapters';
import { ClassConstructor } from '../utils/class-constructor.interface';

export interface Loader {
  load<TTemplate>(template: ClassConstructor<TTemplate>, source: ConfigSource): TTemplate;
}
