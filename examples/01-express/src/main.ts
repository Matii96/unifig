import express from 'express';
import { Config } from '@unifig/core';
import { EnvConfigAdapter } from '@unifig/adapter-env';
import { toTable } from '@unifig/validation-presenter-table';
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

  const app = express();

  app.get('/ping', async (req, res) => {
    const config = Config.getContainer(AppOptions);
    await config.refresh();
    res.send('Pong from localhost:' + config.values.port);
  });

  const options = Config.getValues(AppOptions);
  app.listen(options.port, () => console.log('Listening on port ' + options.port));
}

bootstrap();
