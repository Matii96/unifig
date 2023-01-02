import { ConfigContainer } from './container';

export interface EditableConfigContainer<TTemplate extends Record<string, any> = any>
  extends ConfigContainer<TTemplate> {
  setValues(values: TTemplate): void;
}
