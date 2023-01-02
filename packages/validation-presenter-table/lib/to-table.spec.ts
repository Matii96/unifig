import { ConfigValidationException } from '@unifig/core';
import { mockFailed2dValidation } from './validator.mocks';
import { toTable } from './to-table';

describe('toTable', () => {
  it('should format table from 2d errors', () => {
    expect(toTable(new ConfigValidationException(mockFailed2dValidation()))).toMatchSnapshot();
  });
});
