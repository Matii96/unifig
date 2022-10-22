import 'reflect-metadata';
import { TemplateMock } from '../core.mocks';
import { ConfigValidatorMock } from '../validator/config.validator.mock';
import { ConfigAdapterMock } from '../adapters/plain.adapter.mock';
import { ConfigSourceGroupMock } from './source-group/config.source-group.mock';
import { ConfigManager } from './config.manager';

jest.mock('../validator/config.validator', () => ({ __esModule: true, ConfigValidator: ConfigValidatorMock }));
jest.mock('./source-group/config.source-group', () => ({ __esModule: true, ConfigSourceGroup: ConfigSourceGroupMock }));

describe('ConfigManager', () => {
  let manager: ConfigManager;

  beforeEach(() => {
    manager = new ConfigManager();
  });

  it('should register configs', async () => {
    const adapter = new ConfigAdapterMock();
    await manager.register({ template: TemplateMock, adapter });
    expect(manager.getValues(TemplateMock)).toBeDefined();
  });
});
