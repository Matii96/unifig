import 'reflect-metadata';
import { DbConfigMock, TemplateMock } from '../core.mocks';
import { ConfigValidationException } from './errors/config.validation.exception';
import { ConfigValidator } from './config.validator';

describe('ConfigValidator', () => {
  let validator: ConfigValidator;

  beforeEach(() => {
    validator = new ConfigValidator();
  });

  it('should return ConfigValidationException', () => {
    const config = new TemplateMock();
    expect(validator.validate([config])).toBeInstanceOf(ConfigValidationException);
  });

  it('should structure validation errors', () => {
    const config = new TemplateMock();
    config.db = new DbConfigMock();
    const validationResult = validator.validate([config])!;
    expect(validationResult.errors).toMatchSnapshot();
  });
});
