import { Controller, Get } from '@nestjs/common';
import { InjectConfig } from '@unifig/nest';
import { ConfigContainer } from '@unifig/core';
import { AppOptions } from './app.options';

@Controller()
export class AppController {
  constructor(
    private readonly staticConfig: AppOptions,
    @InjectConfig(AppOptions) private readonly dynamicConfig: ConfigContainer<AppOptions>,
  ) {}

  /** Config is loaded only once on app startup */
  @Get('ping/static')
  pingStatic() {
    return 'Pong from localhost:' + this.staticConfig.port;
  }

  /** Config is loaded on app startup with option to reload it whenever needed */
  @Get('ping/dynamic')
  async pingDynamic() {
    await this.dynamicConfig.refresh();
    return 'Pong from localhost:' + this.dynamicConfig.values.port;
  }
}
