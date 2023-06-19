import { ConfigContainer } from './container';

export interface EditableConfigContainer<
  TTemplate extends Record<string, any> = Record<string, any>
> extends ConfigContainer<TTemplate> {
  setValues(values: TTemplate): void;
}
