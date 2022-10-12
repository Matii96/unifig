import { Module } from '@nestjs/common';
import { ConfigModule } from '../../../lib/config.module';
import { CatsConfig } from './cats.config';
import { CatsService } from './cats.service';

@Module({
  imports: [ConfigModule.forFeature(CatsConfig)],
  providers: [CatsService],
})
export class CatsModule {}
