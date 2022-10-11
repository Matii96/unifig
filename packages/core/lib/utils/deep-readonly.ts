export type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : // eslint-disable-next-line @typescript-eslint/ban-types
  T extends Function
  ? T
  : T extends object
  ? DeepReadonlyObject<T>
  : T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export const deepReadonly = <TObject extends object>(object: TObject) => {
  const copy = Array.isArray(object) ? object.slice() : Object.assign({}, object);
  for (const key in copy) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (typeof copy[key] === 'object') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      copy[key] = deepReadonly(copy[key]);
    }
  }
  return Object.freeze(copy) as DeepReadonly<TObject>;
};
