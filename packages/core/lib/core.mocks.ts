import { IsDefined, IsInt, IsString, Contains } from 'class-validator';
import { From, Nested } from './loader';
import { Secret } from './validator';

export class DbConfigMock {
  @From('DB_URL')
  @IsString()
  url: string;

  @From('DB_PASSWORD')
  @Secret()
  @IsString()
  @Contains('?')
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
