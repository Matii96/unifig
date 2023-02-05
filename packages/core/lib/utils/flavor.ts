interface Flavoring<FlavorT> {
  readonly __type?: FlavorT;
}
export type Flavor<T, FlavorT> = T & Flavoring<FlavorT>;
