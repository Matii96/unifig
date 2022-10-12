# Env variables & files adapter for [Unifig](https://github.com/Matii96/unifig)

## Table of contents

- [Goal](#goal)
- [Installation](#installation)
- [Quick Start](#quick_start)
- [Properties Mapping](#properties_mapping)
- [Options](#options)
- [License](#license)

## Installation

<a name="installation"></a>

```bash
npm i @unifig/env
# or
yarn add @unifig/env
```

## Quick Start

<a name="quick_start"></a>

```bash
# .env
PORT=3000
```

```ts
export class Settings {
  @From('PORT')
  @IsInt()
  port: number;
}
```

```ts
import { Config } from '@unifig/core';
import { EnvConfigAdapter } from '@unifig/env';

async function bootstrap() {
  await Config.register({
    template: Settings,
    adapter: new EnvConfigAdapter(),
  });

  console.log(Config.get(Settings).port); // output: 3000
}

bootstrap();
```

## Properties Mapping

<a name="properties_mapping"></a>

Environment variables are mapped to 1D dictionary.

```bash
# .env
PORT=3000
DB_HOST=localhost
DB_PORT=4588
```

```ts
// adapter output
{
  PORT: 3000,
  DB_HOST: 'localhost',
  DB_PORT: 4588
}
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
