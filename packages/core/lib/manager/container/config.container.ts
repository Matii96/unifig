import { deepReadonly } from '../../utils/deep-readonly';
import { IConfigContainer } from './config.container.interface';
import { ConfigSourceGroup } from '../source-group/config.source-group';

export class ConfigContainer<TTemplate extends Record<string, any> = any> implements IConfigContainer<TTemplate> {
  private _value: TTemplate;
  private readonly _sourceGroup: ConfigSourceGroup;

  constructor(sourceGroup: ConfigSourceGroup) {
    this._sourceGroup = sourceGroup;
  }

  get values() {
    return deepReadonly(this._value);
  }

  setValue(value: TTemplate) {
    this._value = value;
  }

  async refresh() {
    await this._sourceGroup.load();
  }
}
