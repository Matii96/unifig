import { IsInt, IsPositive } from 'class-validator';
import { From } from '@unifig/core';

export class AppOptions {
  @From('PORT')
  @IsInt()
  @IsPositive()
  port: number;
}
