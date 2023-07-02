import { Controller, Get } from '@nestjs/common';
import { InjectConfig } from '@unifig/nest';
import { ConfigContainer } from '@unifig/core';
import { AppOptions } from './app.options';

@Controller()
export class AppController {
  constructor(@InjectConfig(AppOptions) private readonly config: ConfigContainer<AppOptions>) {}

  @Get('ping')
  async ping() {
    await this.config.refresh();
    return `Pong from localhost:${this.config.values.port}`;
  }
}
