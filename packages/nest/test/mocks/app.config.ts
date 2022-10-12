import { IsInt, IsString } from 'class-validator';

export class AppConfig {
  @IsInt()
  port: number;

  @IsString()
  host: string;
}
