import { ConfigValidationError } from '@unifig/core';
import { mockFailed1dValidation } from './validator.mocks';
import { toJSON } from './to-json';

describe('toJSON', () => {
  it('should format json from 1d error', () => {
    expect(toJSON(new ConfigValidationError([mockFailed1dValidation()]))).toMatchSnapshot();
  });
});
