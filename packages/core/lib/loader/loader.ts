import { ConfigSource } from '../adapters';
import { ClassConstructor } from '../utils/class-constructor';
import { LoaderOptions } from './loader.options';

export interface Loader {
  load<TTemplate>(template: ClassConstructor<TTemplate>, source: ConfigSource, options: LoaderOptions): TTemplate;
}
