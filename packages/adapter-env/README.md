# Env variables & files adapter for [Unifig](https://github.com/Matii96/unifig)

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick_start)
- [Options](#options)
- [License](#license)

## Installation

<a name="installation"></a>

```bash
npm i @unifig/adapter-env
# or
yarn add @unifig/adapter-env
```

## Quick Start

<a name="quick_start"></a>

```bash
# .env
PORT=3000
```

```ts
export class DbSettings {
  @From('DB_URL')
  @IsString()
  url: string;

  @From('DB_PASSWORD')
  @IsString()
  password: string;
}

export class AppSettings {
  @From('PORT')
  @IsInt()
  port: number;

  @Nested(() => DbSettings)
  @IsDefined()
  db: DbSettings;
}
```

```ts
import { Config } from '@unifig/core';
import { EnvConfigAdapter } from '@unifig/adapter-env';

function bootstrap() {
  Config.registerSync({
    template: Settings,
    adapter: new EnvConfigAdapter(),
  });

  const { port } = Config.getValues(AppSettings);
  console.log(port); // output: 3000
}

bootstrap();
```

## Options

<a name="options"></a>

| Property          | What it does                                                                                                          | Required |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- | -------- |
| `envFilesPaths`   | Path to optional environment files to be loaded in given order. Values from them will be overwritten by process envs. | &times;  |
| `ignoreEnvVars`   | If "true", environment variables will not be loaded.                                                                  | &times;  |
| `expandVariables` | See https://www.npmjs.com/package/dotenv-expand.                                                                      | &times;  |

## License

<a name="license"></a>

This project is licensed under the MIT License - see the [LICENSE file](https://github.com/Matii96/unifig/tree/main/LICENSE) for details.
