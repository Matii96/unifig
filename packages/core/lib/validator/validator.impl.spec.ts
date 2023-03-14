import 'reflect-metadata';
import { DbConfigMock, TemplateMock } from '../core.mocks';
import { ConfigValidationError } from './errors/validation.error';
import { ClassValidator } from './validator.impl';
import { Validator } from './validator';

describe('ClassValidator', () => {
  let validator: Validator;

  beforeEach(() => {
    validator = new ClassValidator();
  });

  it('should return ConfigValidationError', () => {
    const config = new TemplateMock();
    expect(validator.validate([config])).toBeInstanceOf(ConfigValidationError);
  });

  it('should structure validation errors', () => {
    const config = new TemplateMock();
    config.db = new DbConfigMock();
    const validationResult = validator.validate([config])!;
    expect(validationResult.errors).toMatchSnapshot();
  });

  it('should hide secret value', () => {
    const config = new TemplateMock();
    config.db = new DbConfigMock();
    config.db.password = 'my-password';
    const validationResult = validator.validate([config])!;
    expect(validationResult.errors).toMatchSnapshot();
  });
});
