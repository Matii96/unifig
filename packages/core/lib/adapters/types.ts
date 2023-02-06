export type ConfigSource = { [key: string]: ConfigSourceEntry };
export type ConfigSourceEntry = string | number | boolean | ConfigSource | Array<ConfigSourceEntry>;
