import { Injectable } from '@nestjs/common';
import { ConfigContainer } from '@unifig/core';
import { InjectConfig } from '../../../lib';
import { AppConfig } from '../app.config';
import { CatsConfig } from './cats.config';

@Injectable()
export class CatsService {
  constructor(
    @InjectConfig() readonly appConfig: ConfigContainer<AppConfig>,
    @InjectConfig(CatsConfig) readonly catsConfig: ConfigContainer<CatsConfig>
  ) {}
}
