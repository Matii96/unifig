import { IsInt, IsString } from 'class-validator';
import { Nested } from '../../lib';

class DbConfig {
  @IsString()
  url: string;
}

export class ValidationTemplate {
  @IsInt()
  port: number;

  @Nested(() => DbConfig)
  db: DbConfig;
}
