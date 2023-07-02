import { ConfigValidationError } from '@unifig/core';
import { mockFailed1dValidation, mockFailed2dValidation } from './validator.mocks';
import { toJSON } from './to-json';

describe('toJSON', () => {
  it('should print 2d errors in json format in one line', () => {
    expect(toJSON(new ConfigValidationError([mockFailed1dValidation()]))).toMatchSnapshot();
  });

  it('should pretty print 2d errors in json format', () => {
    expect(
      toJSON(new ConfigValidationError(mockFailed2dValidation()), { space: 2 })
    ).toMatchSnapshot();
  });
});
