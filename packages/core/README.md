<h1 align="center">Unifig</h1>

<div align="center">

Universal, typed and validated configuration manager.

[![MIT Licensed](https://img.shields.io/badge/License-MIT-brightgreen)](/LICENSE)
[![NPM version](https://img.shields.io/npm/v/@unifig/core.svg)](https://www.npmjs.com/package/@unifig/core)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli)
[![codecov](https://codecov.io/gh/Matii96/unifig/branch/main/graph/badge.svg?token=B7P8F8GUU8)](https://codecov.io/gh/Matii96/unifig)
[![Build Status](https://github.com/Matii96/unifig/workflows/main-build/badge.svg?branch=main)](https://github.com/Matii96/unifig/actions?workflow=main-build)

</div>

## Table of contents

- [Installation](#installation)
- [Setting up Templates](#templates)
  - [Subtemplates](#templates_subtemplates)
- [Loading](#loading)
  - [Values Adapters](#loading_adapters)
  - [Multiple Configurations](#loading_multiple_configurations)
  - [Inline Validation Rejection](#loading_inline_rejection)
- [Stale Data](#stale_data)
- [Todo Before 1.0.0](#100todo)
- [License](#license)

## 💡 Goal

<a name="goal"></a>

Unifig aims to provides simple and abstract way of handling app's configuration. It allows to load configuration data from multiple sources without changing defined config template. Many templates can be defined to further organize the code eg. MainConfiguration and ModuleConfiguration.

Adapted configuration data is transformed into templates and validated via [class-transformer](https://github.com/typestack/class-transformer) and [class-validator](https://github.com/typestack/class-validator). Once initialized configurations can be reloaded without app restart.

## Installation

<a name="installation"></a>

```bash
npm i @unifig/core
# or
yarn add @unifig/core
```

## Setting up Templates

<a name="templates"></a>

Unifig centralizes configuration management in classes called templates. They are resposible for deserializing config values from sources into rich js / ts objects and validating them afterwards.

```ts
import { From, Nested } from '@unifig/core';
import { Transform } from 'class-transformer';
import { IsString, IsArray } from 'class-validator';

class DbSettings {
  @From({ key: 'DB_URL', default: 'localhost' })
  @IsString()
  url: string;

  @From('DB_PASSWORD')
  @IsString()
  password: string;

  @From('DB_RECONNECT_DELAYS')
  @Transform(({ value }) => value.split(',').map((n) => Number(n)))
  @IsArray()
  reconnectDelays: number[];
}
```

### Subtemplates

<a name="templates_subtemplates"></a>

They allow to keep config structure organized by grouping inseparable properties and allowing reusing of them. The subtemplate itself is declared just as regular template, including option to nest further subtemplates in it.

```ts
export class AppSettings {
  @From('PORT')
  @IsInt()
  port: number;

  @Nested(() => DbSettings)
  db: DbSettings;
}
```

## Loading configuration

<a name="loading"></a>

After defining template they should be loaded before any other action in the application takes place.

```ts
import { Config, PlainConfigAdapter } from '@unifig/core';

async function bootstrap() {
  const validationError = await Config.register({
    template: AppSettings,
    adapter: new PlainConfigAdapter({
      PORT: 3000,
      DB_URL: 'localhost:5467',
      DB_PASSWORD: 'password',
      DB_RECONNECT_DELAYS: '56,98,34,72',
    }),
  });

  if (validationError) {
    console.error(validationError.message);
    process.exit(1);
  }

  console.log(Config.getValues(AppSettings).port); // output: 3000
}

bootstrap();
```

Above example uses built-in adapter which transforms static object into Settings. See full list of adapters [here](https://github.com/Matii96/unifig#packages).

### Values adapters

<a name="loading_adapters"></a>

Unifig allows to easily swap config values sources or introduce new ones.
Implementation of the adapter consist of class which exposes `load` method, which is called upon config initialization. The method should return dictionary with keys used in `@From` decorators in templates and underlying values.

```ts
import { ConfigAdapter, ConfigSource } from '@unifig/core';

export class CustomAdapter implements ConfigAdapter {
  async load(): Promise<ConfigSource> {
    return {
      PORT: '3000', // will be parsed to number as declared in template
      DB_URL: 'localhost:5467',
      DB_PASSWORD: 'password',
      DB_RECONNECT_DELAYS: '56,98,34,72',
    };
  }
}
```

```ts
await Config.register({
  template: AppSettings,
  adapter: new CustomAdapter(),
});
```

### Multiple Configurations

<a name="loading_multiple_configurations"></a>

In case no single configuration root (`AppSettings` in above example), templates need to be registered separately.

```ts
await Config.register(
  { template: DbSettings, adapter: ... },
  { template: AuthSettings, adapter: ... },
  { templates: [FilesStorageSettings, CacheSettings], adapter: ... },
);
```

### Inline validation rejection

<a name="loading_inline_rejection"></a>

To throw validation exception right away after encountering errors instead of returning it use

```ts
await Config.registerOrReject({ template: DbSettings, adapter: ... });
```

## Stale Data

<a name="stale_data"></a>

Upon changing application's configuration one must be usually restared to re-fetch new values. Unifig delivers an option to reload registered configurations in real time without app's restart.

```ts
await Config.getContainer(Settings).refresh();
```

## Todo before 1.0.0 release

<a name="100todo"></a>

- allow to automate configurations values reloads in user-defined source group scoped intervals
- add hook for config refreshed event to allow an app react to the change. Pass difference between old and new values?
- add example project under `/examples` directory

## License

<a name="license"></a>

This project is licensed under the MIT License - see the [LICENSE file](https://github.com/Matii96/unifig/tree/main/LICENSE) for details.
