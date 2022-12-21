import 'reflect-metadata';
import { TemplateMock } from '../core.mocks';
import { ConfigAdapterMock } from '../adapters/adapter.mock';
import { ValidatorMock } from '../validator/validator.mock';
import { LoaderMock } from '../loader/loader.mock';
import { Validator } from '../validator/validator';
import { ConfigValidationException } from '../validator';
import { SourceGroup } from './source-group/source-group';
import { SourceGroupMock } from './source-group/source-group.mock';
import { ConfigContainerMock } from './container/container.mock';
import { InternalConfigManager } from './manager.impl';
import { ConfigManager } from './manager';
import { ConfigNotInitializedException } from './exceptions';

describe('InternalConfigManager', () => {
  let validator: Validator;
  let manager: ConfigManager;
  let sourceGroupFactory: jest.Mock<SourceGroup, []>;

  beforeEach(() => {
    validator = new ValidatorMock();
    sourceGroupFactory = jest.fn(() => new SourceGroupMock());
    manager = new InternalConfigManager(
      validator,
      new LoaderMock(),
      () => new ConfigContainerMock(),
      sourceGroupFactory
    );
  });

  describe('registration', () => {
    it('should validate config', async () => {
      const adapter = new ConfigAdapterMock();
      await manager.register({ template: TemplateMock, adapter });
      expect(validator.validate).toHaveBeenCalledTimes(1);
    });

    it('should throw validation exception', async () => {
      const adapter = new ConfigAdapterMock();
      jest.spyOn(manager, 'register').mockResolvedValueOnce(new ConfigValidationException([]));
      expect(manager.registerOrReject({ template: TemplateMock, adapter })).rejects.toThrow(ConfigValidationException);
    });
  });

  describe('access', () => {
    it('should get template values', async () => {
      const templateValues = { port: 3000 };
      const configContainer = new ConfigContainerMock();
      configContainer.setValues({ port: 3000 });

      const sourceGroup = new SourceGroupMock();
      jest.spyOn(sourceGroup, 'getContainer').mockReturnValueOnce(configContainer);
      sourceGroupFactory.mockReturnValueOnce(sourceGroup);

      const adapter = new ConfigAdapterMock();
      await manager.register({ template: TemplateMock, adapter });
      expect(manager.getValues(TemplateMock)).toEqual(templateValues);
    });

    it('should throw exception as no template was not registered', () => {
      expect(() => manager.getValues(TemplateMock)).toThrow(ConfigNotInitializedException);
    });
  });
});
