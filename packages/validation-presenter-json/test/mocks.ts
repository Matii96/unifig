import { From, Nested } from '@unifig/core';
import { IsDefined, IsInt, IsString } from 'class-validator';

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
