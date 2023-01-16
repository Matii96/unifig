import { overrideObject } from './override-object';

describe('overrideObject', () => {
  it('should add new property', () => {
    expect(overrideObject({ id: 0 }, { name: 'test' })).toEqual({ id: 0, name: 'test' });
  });

  it('should override primitives', () => {
    expect(overrideObject({ id: 0 }, { id: 1 })).toEqual({ id: 1 });
  });

  it('should expand array', () => {
    expect(overrideObject({ array: [0, 1] }, { array: [2] })).toEqual({ array: [0, 1, 2] });
  });

  it('should override nested object', () => {
    expect(overrideObject({ obj: { id: 0 } }, { name: 'test', obj: { id: 1 } })).toEqual({
      name: 'test',
      obj: { id: 1 },
    });
  });
});
