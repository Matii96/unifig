import { deepReadonly } from './deep-readonly';

describe('deepReadonly', () => {
  it('should copy object as readonly', () => {
    const array = [{ val: 1 }, { val: 2 }];

    const readonlyArray = deepReadonly(array);

    // @ts-ignore
    expect(() => (readonlyArray[0].val = 10)).toThrow(TypeError);
  });

  it('should not change custom object instance', () => {
    const date = new Date();
    const array = [{ val: 1 }, { val: date }];

    const readonlyArray = deepReadonly(array);

    expect(readonlyArray[1].val).toBe(date);
  });

  it('should omit freezing nulled values', () => {
    const array = [{ val: 1 }, { val: null }];

    const readonlyArray = deepReadonly(array);

    expect(readonlyArray[1].val).toBe(null);
  });
});
