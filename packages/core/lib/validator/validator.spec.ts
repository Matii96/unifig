import 'reflect-metadata';
import { DbConfigMock, TemplateMock } from '../core.mocks';
import { ConfigValidationException } from './errors/validation.exception';
import { ClassValidator } from './validator.impl';
import { Validator } from './validator';

describe('ClassValidator', () => {
  let validator: Validator;

  beforeEach(() => {
    validator = new ClassValidator();
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
