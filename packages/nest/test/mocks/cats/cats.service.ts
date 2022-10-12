import { Injectable } from '@nestjs/common';
import { ConfigContainer } from '@unifig/core/dist/manager/config.container';
import { InjectConfig } from '../../../lib/injection/inject-container.decorator';
import { AppConfig } from '../app.config';
import { CatsConfig } from './cats.config';

@Injectable()
export class CatsService {
  constructor(
    @InjectConfig() readonly appConfig: ConfigContainer<AppConfig>,
    @InjectConfig(CatsConfig) readonly catsConfig: ConfigContainer<CatsConfig>
  ) {}
}
