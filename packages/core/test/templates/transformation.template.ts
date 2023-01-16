import { Type } from 'class-transformer';
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

class SubConfig {
  port: number;
}

export class TransformationArrayTemplate {
  @Type(() => SubConfig)
  ports: SubConfig[];
}
