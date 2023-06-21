import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Config, ConfigContainer } from '@unifig/core';
import { EnvConfigAdapter } from '@unifig/adapter-env';
import { toTable } from '@unifig/validation-presenter-table';
import { getConfigContainerToken } from '@unifig/nest';
import { AppOptions } from './app.options';

async function bootstrap() {
  const validationError = await Config.register({
    templates: [AppOptions],
    adapter: new EnvConfigAdapter({ envFilesPaths: ['.env.example'] }),
  });
  if (validationError) {
    console.error(toTable(validationError));
    process.exit(1);
  }

  const { AppModule } = await import('./app.module');
  const app = await NestFactory.create(AppModule);
  const { values: options } = app.get<ConfigContainer<AppOptions>>(
    getConfigContainerToken(AppOptions)
  );

  await app.listen(options.port, () =>
    Logger.log('Listening at http://localhost:' + options.port, 'NestApplication')
  );
}
bootstrap();
