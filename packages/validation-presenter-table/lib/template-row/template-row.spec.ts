import { mockFailed1dValidation, mockFailed2dValidation } from '../validator.mocks';
import { TemplateRow } from './template-row';

describe('TemplateRow', () => {
  it('should format row from 1d error', () => {
    expect(
      TemplateRow.fromValidationError(mockFailed1dValidation().errors[0]).toArray(),
    ).toMatchSnapshot();
  });

  it('should format table from 2d errors', () => {
    expect(
      TemplateRow.fromValidationError(mockFailed2dValidation()[0].errors[1]).toArray(),
    ).toMatchSnapshot();
  });
});
