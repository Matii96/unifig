import { ConfigValidationException } from '@unifig/core';
import { mockFailed1dValidation, mockFailed2dValidation } from '../lib/validator.mocks';
import { toJSON } from '../lib';

describe('@unifig/validation-presenter-json (e2e)', () => {
  it('should print 2d errors in json format in one line', () => {
    expect(toJSON(new ConfigValidationException([mockFailed1dValidation()]))).toMatchSnapshot();
  });

  it('should pretty print 2d errors in json format', () => {
    expect(toJSON(new ConfigValidationException(mockFailed2dValidation()), { space: 2 })).toMatchSnapshot();
  });
});
