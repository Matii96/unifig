import 'reflect-metadata';
import { ConfigAdapterMock } from '../../../adapters/adapter.mock';
import { AdapterTypeMismatchException } from './adapter-type-mismatch.exception';

describe('AdapterTypeMismatchException', () => {
  it('should format message', () => {
    const exception = new AdapterTypeMismatchException(ConfigAdapterMock);
    expect(exception.message).toContain(ConfigAdapterMock.name);
  });
});
