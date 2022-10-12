import { Module } from '@nestjs/common';
import { ConfigModule } from '../../lib/config.module';
import { AppConfig } from './app.config';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [ConfigModule.forRoot(AppConfig), CatsModule],
})
export class AppModule {}
