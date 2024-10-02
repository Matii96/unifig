import { DeepReadonly } from '../../utils';
import { deepReadonly } from '../../utils/deep-readonly/deep-readonly';
import { SourceGroup } from '../source-group/source-group';
import { EditableConfigContainer } from './editable-container';

export class InternalConfigContainer<TTemplate extends Record<string, any> = Record<string, any>>
  implements EditableConfigContainer<TTemplate>
{
  private _values: DeepReadonly<TTemplate>;

  constructor(private readonly _sourceGroup: SourceGroup) {}

  get values() {
    return this._values;
  }

  setValues(values: TTemplate) {
    this._values = deepReadonly(values);
  }

  async refresh() {
    await this._sourceGroup.load();
  }
}
