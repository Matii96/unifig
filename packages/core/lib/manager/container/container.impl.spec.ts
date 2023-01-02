import 'reflect-metadata';
import { TemplateMock } from '../../core.mocks';
import { SourceGroup } from '../source-group/source-group';
import { SourceGroupMock } from '../source-group/source-group.mock';
import { InternalConfigContainer } from './container.impl';
import { EditableConfigContainer } from './editable-container';

describe('InternalConfigContainer', () => {
  let sourceGroup: SourceGroup;
  let container: EditableConfigContainer<TemplateMock>;

  beforeEach(() => {
    sourceGroup = new SourceGroupMock();
    container = new InternalConfigContainer(sourceGroup);
  });

  it('should set config value', () => {
    const value: TemplateMock = { port: 3000, db: { url: 'db://localhost', password: 'password' } };
    container.setValues(value);
    expect(container.values).toEqual(value);
  });

  it('should refresh config source group', async () => {
    await container.refresh();
    expect(sourceGroup.load).toHaveBeenCalledTimes(1);
  });
});
