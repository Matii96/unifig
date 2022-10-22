import 'reflect-metadata';
import { TemplateMock } from '../../core.mocks';
import { ConfigSourceGroup } from '../source-group/config.source-group';
import { ConfigSourceGroupMock } from '../source-group/config.source-group.mock';
import { ConfigContainer } from './config.container';

describe('ConfigContainer', () => {
  let sourceGroup: ConfigSourceGroup;
  let container: ConfigContainer<TemplateMock>;

  beforeEach(() => {
    // @ts-ignore
    sourceGroup = new ConfigSourceGroupMock();
    container = new ConfigContainer(sourceGroup);
  });

  it('should set config value', () => {
    const value: TemplateMock = { port: 3000, db: { url: 'db://localhost', password: 'password' } };
    container.setValue(value);
    expect(container.values).toEqual(value);
  });

  it('should refresh config source group', async () => {
    await container.refresh();
    expect(sourceGroup.load).toHaveBeenCalledTimes(1);
  });
});
