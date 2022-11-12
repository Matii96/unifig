import { From, Nested } from '../../lib';

class DbConfig {
  @From('global.dbUrl')
  url: string;

  @From('global.dbPassword')
  password: string;
}

export class TransformationTemplate {
  @From('local.port')
  port: number;

  @Nested(() => DbConfig)
  db: DbConfig;
}
