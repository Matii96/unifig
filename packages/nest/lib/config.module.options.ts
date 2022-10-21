import { Type } from '@nestjs/common';

export interface ConfigModuleForRootOptions {
  /**
   * Global configuration accessible via `@InjectConfig()` decorator without parameter.
   */
  default?: Type;
  templates?: Type[];
}
