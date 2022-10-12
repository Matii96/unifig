import { IsInt, IsString } from 'class-validator';

export class CatsConfig {
  @IsInt()
  catsPort: number;

  @IsString()
  catsHost: string;
}
