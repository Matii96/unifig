import 'reflect-metadata';
import { TemplateMock } from '../core.mocks';
import { ConfigValidationException } from './exception/config.validation.exception';
import { ConfigValidator } from './config.validator';

describe('ConfigValidator', () => {
  let validator: ConfigValidator;

  beforeEach(() => {
    validator = new ConfigValidator();
  });

  it('should throw ConfigValidationException', () => {
    const config = new TemplateMock();
    expect(() => validator.validate([config])).toThrow(ConfigValidationException);
  });
});
