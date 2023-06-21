import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@unifig/nest';
import { AppOptions } from './app.options';

@Module({
  imports: [ConfigModule.forRoot({ templates: [AppOptions] })],
  controllers: [AppController],
})
export class AppModule {}
