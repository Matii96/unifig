import 'reflect-metadata';
import { TemplateMock } from '../../core.mocks';
import { ConfigNotInitializedException } from './config-not-initialized.exception';

describe('ConfigNotInitializedException', () => {
  it('should format message', () => {
    const exception = new ConfigNotInitializedException(TemplateMock);
    expect(exception.message).toContain(TemplateMock.name);
  });
});
