export class ConfigValidationException<TConfig extends object> extends Error {
  constructor(config: TConfig, msg: string) {
    super(`Validation failed for ${config.constructor.name}:${msg}`);
    this.name = ConfigValidationException.name;
  }
}
