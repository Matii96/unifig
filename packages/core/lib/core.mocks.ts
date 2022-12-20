import { IsDefined, IsInt, IsString } from 'class-validator';
import { From, Nested } from './loader';

export class DbConfigMock {
  @From('DB_URL')
  @IsString()
  url: string;

  @From('DB_PASSWORD')
  @IsString()
  password: string;
}

export class TemplateMock {
  @From('PORT')
  @IsInt()
  port: number;

  @Nested(() => DbConfigMock)
  @IsDefined()
  db: DbConfigMock;
}
