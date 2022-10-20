import { Type } from '@nestjs/common';

export interface ConfigModuleForRootOptions {
  default?: Type;
  templates?: Type[];
}
