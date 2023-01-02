import { DeepReadonly } from '../../utils';
import { EditableConfigContainer } from './editable-container';

export class ConfigContainerMock<TTemplate extends Record<string, any> = any>
  implements EditableConfigContainer<TTemplate>
{
  private _values: TTemplate;

  get values() {
    return this._values as DeepReadonly<TTemplate>;
  }

  setValues = jest.fn((values: TTemplate) => (this._values = values));
  refresh = jest.fn();
}
