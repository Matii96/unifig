import { TemplateMock } from '../../core.mocks';
import { ConfigContainerMock } from '../container/container.mock';
import { SourceGroup } from './source-group';

export class SourceGroupMock implements SourceGroup {
  readonly templates = [TemplateMock];
  init = jest.fn();
  getContainer = jest.fn(() => new ConfigContainerMock());
  load = jest.fn();
  loadSync = jest.fn();
}
