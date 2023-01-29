import { ConfigValidationError } from '@unifig/core';
import { mockFailed1dValidation, mockFailed2dValidation } from './validator.mocks';
import { toTable } from './to-table';

describe('toTable', () => {
  it('should format table from 1d error', () => {
    expect(toTable(new ConfigValidationError([mockFailed1dValidation()]))).toMatchSnapshot();
  });

  it('should format table from 2d errors', () => {
    expect(toTable(new ConfigValidationError(mockFailed2dValidation()))).toMatchSnapshot();
  });
});
