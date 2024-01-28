import 'reflect-metadata';
import { Nested } from '../decorators';
import { getNestedTemplates } from './get-nested-templates';

describe('getNestedTemplates', () => {
  class SubarrayTemplateMock {
    port: number;
  }

  class ArraySourceTemplateMock {
    @Nested(() => SubarrayTemplateMock)
    sub: SubarrayTemplateMock[];
  }

  it('should explore nested template', () => {
    const nested = getNestedTemplates(ArraySourceTemplateMock);
    expect(nested).toEqual([ArraySourceTemplateMock, SubarrayTemplateMock]);
  });
});
