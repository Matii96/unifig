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
- [Using Configuration](#loading)
  - [Quick Start](#loading_quick_start)
  - [Values Adapters](#loading_adapters)
    - [Types conversion](#loading_adapters_conversion)
    - [Functions adapters](#loading_adapters_functions)
  - [Multiple Configurations](#loading_multiple_configurations)
  - [Inline Validation Rejection](#loading_inline_rejection)
- [Validation](#validation)
  - [Presenters](#validation_presenters)
  - [Secrets](#validation_secrets)
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

## Using Configuration

<a name="loading"></a>

Such defined templates should be loaded before any other action in the application takes place. After that configuration can be accessed from any place in the app via global `Config` reference.

### Quick Start

<a name="loading_quick_start"></a>

```ts
import { Config, PlainConfigAdapter } from '@unifig/core';

async function bootstrap() {
  const validationError = await Config.register({
    template: AppSettings,
    adapter: async () => ({
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

  const options = Config.getValues(AppSettings);
  console.log(options.port); // output: 3000
  console.log(options.db.url); // output: localhost:5467
}

bootstrap();
```

### Values adapters

<a name="loading_adapters"></a>

Unifig allows to easily swap config values sources or introduce new ones.
Implementation of the adapter consist of class which exposes `load` method, which is called upon config initialization. The method should return dictionary with keys used in `@From` decorators in templates and underlying values.

```ts
import { ConfigAdapter, ConfigSource } from '@unifig/core';

export class CustomAdapter implements ConfigSyncAdapter {
  load(): ConfigSource {
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
Config.registerSync({
  template: AppSettings,
  adapter: new CustomAdapter(),
});
```

In case of asynchronous way of loading config (like cloud remote configuration service) the adapter needs to implement `ConfigAdapter` interface.

```ts
import { ConfigAdapter, ConfigSource } from '@unifig/core';

export class RemoteConfigAdapter implements ConfigAdapter {
  async load(): Promise<ConfigSource> {
    return { ... };
  }
}
```

Such adapter requires to be used by async `register` method.

```ts
await Config.register({
  template: AppSettings,
  adapter: new RemoteConfigAdapter(),
});
```

See full list of adapters [here](https://github.com/Matii96/unifig#packages).

#### Functions Adapters

<a name="loading_adapters_functions"></a>

Alternatively adapter can be defined as standalone sync or async function with same rules applied.

```ts
Config.registerSync({
  template: AppSettings,
  adapter: () => ({
    PORT: '3000',
    DB_URL: 'localhost:5467',
    DB_PASSWORD: 'password',
    DB_RECONNECT_DELAYS: '56,98,34,72',
  }),
});
```

#### Types Conversion

<a name="loading_adapters_conversion"></a>

When loading configuration from predefined objects it's handy to disable the default behavior of implicit properties types conversion.

```ts
await Config.register({
  template: AppSettings,
  enableImplicitConversion: false,
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

### Inline Validation Rejection

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

## Validation

<a name="validation"></a>

Template errors can be handled in various ways, usually exiting the application early to prevent unexpected behavior.

```ts
const validationError = Config.registerSync({ ... });

if (validationError) {
  console.error(validationError.message);
  process.exit(1);
}
```

### Presenters

<a name="validation_presenters"></a>

Message contains list of templates names that failed validation. The errors object contains details about what and why doesn't fullfil requirements. Presenters are to utilize this information in a readable manner.

- [Validation presenter: table](https://github.com/Matii96/unifig/tree/main/packages/validation-presenter-table) - 2d table format
- [Validation presenter: JSON](https://github.com/Matii96/unifig/tree/main/packages/validation-presenter-json) - JSON string

### Secrets

<a name="validation_secrets"></a>

Validation report involves properties values that didn't pass validation. In some cases it's required to hide them. For such cases there is a `Secret` decorator.

```ts
export class DbConfigMock {
  @From('DB_URL')
  @IsString()
  url: string;

  @From('DB_PASSWORD')
  @Secret()
  @IsString()
  password: string;
}
```

With it applied, `password` value will be transformed into `******` in potential validation report.

## Todo before 1.0.0 release

<a name="100todo"></a>

- allow to automate configurations values reloads in user-defined source group scoped intervals
- add hook for config refreshed event to allow an app react to the change. Pass difference between old and new values?
- add example project under `/examples` directory

## License

<a name="license"></a>

This project is licensed under the MIT License - see the [LICENSE file](https://github.com/Matii96/unifig/tree/main/LICENSE) for details.
