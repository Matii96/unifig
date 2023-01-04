import { ConfigValidationError } from '@unifig/core';
import { mockFailed1dValidation, mockFailed2dValidation } from '../lib/validator.mocks';
import { toTable } from '../lib';

describe('@unifig/validation-presenter-table (e2e)', () => {
  it('should format table from 1d error', () => {
    expect(toTable(new ConfigValidationError([mockFailed1dValidation()]))).toMatchSnapshot();
  });

  it('should format table from 2d errors', () => {
    expect(toTable(new ConfigValidationError(mockFailed2dValidation()))).toMatchSnapshot();
  });
});
