import { Injectable } from '@nestjs/common';
import { IConfigContainer } from '@unifig/core';
import { InjectConfig } from '../../../lib';
import { AppConfig } from '../app.config';
import { CatsConfig } from './cats.config';

@Injectable()
export class CatsService {
  constructor(
    @InjectConfig() readonly appConfig: IConfigContainer<AppConfig>,
    @InjectConfig(CatsConfig) readonly catsConfig: IConfigContainer<CatsConfig>
  ) {}
}
