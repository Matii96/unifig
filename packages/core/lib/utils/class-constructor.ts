// eslint-disable-next-line @typescript-eslint/ban-types
export interface ClassConstructor<T = any> extends Function {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
}
