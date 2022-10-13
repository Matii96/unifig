<h1 align="center">Unifig</h1>

<div align="center">

Universal, typed and validated configuration manager.

[![MIT Licensed](https://img.shields.io/badge/License-MIT-brightgreen)](/LICENSE)
[![NPM version](https://img.shields.io/npm/v/@unifig/core.svg)](https://www.npmjs.com/package/@unifig/core)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli)
[![Build Status](https://github.com/Matii96/unifig/workflows/main-build/badge.svg?branch=main)](https://github.com/Matii96/unifig/actions?workflow=main-build)

</div>

## Table of contents

- [Goal](#goal)
- [Installation](#installation)
- [Quick Start](#quick_start)
- [Multiple Configurations](#multiple_configurations)
- [Stale Data](#stale_data)
- [License](#license)

## 💡 Goal

<a name="goal"></a>

Unifig aims to provides simple and abstract way of handling app's configuration. It allows to load configuration data from multiple sources without changing defined config template. Many templates an be defined to further organize the code eg. MainConfiguration and ModuleConfiguration.

Adapted configuration data is transformed into templates and validated via [class-transformer](https://github.com/typestack/class-transformer) and [class-validator](https://github.com/typestack/class-validator).

## Installation

<a name="installation"></a>

```bash
npm i @unifig/core
# or
yarn add @unifig/core
```

## Quick Start

<a name="quick_start"></a>

```ts
import { From, Nested } from '@unifig/core';
import { Transform } from 'class-transformer';
import { IsString, IsArray } from 'class-validator';

class DbSettings {
  @From('global.dbUrl')
  @IsString()
  url: string;

  @From('global.dbPassword')
  @IsString()
  password: string;
}

export class Settings {
  @From('local.port')
  @IsInt()
  port: number;

  @Transform(({ value }) => value.split(',').map((n) => Number(n)))
  @IsArray()
  intervals: number[];

  @Nested(DbSettings)
  db: DbSettings;
}
```

```ts
import { Config, PlainConfigAdapter } from '@unifig/core';

async function bootstrap() {
  await Config.register({
    template: Settings,
    adapter: new PlainConfigAdapter({
      local: { port: 3000 },
      global: { dbUrl: 'localhost:5467', dbPassword: 'password' },
      intervals: '56,98,34,72',
    }),
  });

  console.log(Config.values(Settings).port); // output: 3000
}

bootstrap();
```

Above example uses built-in adapter which transforms static object into Settings. See full list of adapters [here](https://github.com/Matii96/unifig#packages).

## Multiple Configurations

<a name="multiple_configurations"></a>

```ts
async function bootstrap() {
  await Config.register(
    { template: MainConfiguration, adapter: ... },
    { template: ModuleConfiguration, adapter: ... },
  );

  Config.values(MainConfiguration).globalProperty
  Config.values(ModuleConfiguration).moduleProperty
}
```

Additional configs may be registered with separate `.register()` calls.

## Stale Data

<a name="stale_data"></a>

Upon changing application's configuration one must be usually restared to re-fetch new values. Unifig delivers an option to reload registered configurations in real time without app's restart.

```ts
await Config.container(Settings).refresh();
```

## License

<a name="license"></a>

This project is licensed under the MIT License - see the [LICENSE file](https://github.com/Matii96/unifig/tree/main/LICENSE) for details.
