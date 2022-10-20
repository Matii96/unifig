import 'reflect-metadata';
import { TemplateMock, mockFailedValidation } from '../core.mocks';
import { ConfigValidationException } from './config.validation.exception';

describe('ConfigValidationException', () => {
  let exception: ConfigValidationException;

  beforeEach(() => {
    exception = new ConfigValidationException([{ template: TemplateMock, errors: mockFailedValidation }]);
  });

  it('should format failed validation report', () => {
    expect(exception.message).toContain('db2.subdb.password');
  });
});
