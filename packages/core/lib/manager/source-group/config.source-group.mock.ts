import { TemplateMock } from '../../core.mocks';
import { Type } from '../../utils/type.interface';
import { ConfigContainerMock } from '../container/config.container.mock';

export class ConfigSourceGroupMock {
  get templates(): Type[] {
    return [TemplateMock];
  }
  getContainer = jest.fn(() => new ConfigContainerMock());
  load = jest.fn();
}
