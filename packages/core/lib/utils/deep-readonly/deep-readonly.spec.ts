import { deepReadonly } from './deep-readonly';

describe('deepReadonly', () => {
  it('should copy object as readonly', () => {
    const array = [{ val: 1 }, { val: 2 }];
    const readonlyArray = deepReadonly(array);
    // @ts-ignore
    expect(() => (readonlyArray[0].val = 10)).toThrow(TypeError);
  });
});
