import 'reflect-metadata';
import { AdapterTypeMismatchException } from './adapter-type-mismatch.exception';
import { ConfigAdapterMock } from '../../../adapters/class-adapters/adapter.mock';

describe('AdapterTypeMismatchException', () => {
  it('should format message', () => {
    const exception = new AdapterTypeMismatchException(ConfigAdapterMock);
    expect(exception.message).toContain(ConfigAdapterMock.name);
  });
});
