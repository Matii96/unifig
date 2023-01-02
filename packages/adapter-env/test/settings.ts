import { IsInt } from 'class-validator';
import { From } from '@unifig/core';

export class Settings {
  @From('PORT')
  @IsInt()
  port: number;
}
