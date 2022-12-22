# Table validation presenter for [Unifig](https://github.com/Matii96/unifig)

Transforms configuration validation errors into clear table.

## Table of contents

- [Installation](#installation)
- [Quick Start](#quick_start)
- [Example output](#example_output)
- [License](#license)

## Installation

<a name="installation"></a>

```bash
npm i @unifig/validation-presenter-table
# or
yarn add @unifig/validation-presenter-table
```

## Quick Start

<a name="quick_start"></a>

```ts
// main.ts
import { Config, PlainConfigAdapter } from '@unifig/core';
import { Config, PlainConfigAdapter } from '@unifig/validation-presenter-table@unifig/validation-presenter-table';

async function bootstrap() {
  const validationResult = await Config.register({
    template: Settings,
    adapter: new PlainConfigAdapter({}),
  });
  if (validationResult) {
    console.error(toTable(validationResult));
    process.exit(1);
  }
}

bootstrap();
```

## Example output

<a name="example_output"></a>

```
┌──────────────────┬─────────────┬─────────────┬───────────────┬────────────────────┐
│ Template         │ Property    │ Source      │ Current Value │ Failed constraints │
├──────────────────┼─────────────┼─────────────┼───────────────┼────────────────────┤
│                  │ port        │ PORT        │ not-a-port    │ isInt              │
│                  ├─────────────┼─────────────┼───────────────┼────────────────────┤
│ StorageOptions   │ db.url      │ DB_URL      │ undefined     │ isString           │
│                  ├─────────────┼─────────────┼───────────────┼────────────────────┤
│                  │ db.password │ DB_PASSWORD │ undefined     │ isString           │
├──────────────────┼─────────────┼─────────────┼───────────────┼────────────────────┤
│ NetworkOptions   │ ipRange     │ IP_RANGE    │ undefined     │ isDefined          │
└──────────────────┴─────────────┴─────────────┴───────────────┴────────────────────┘
```

`Source` column presents where property value was taken from.

Example: from env variables in case of [Env Adapter](https://github.com/Matii96/unifig/tree/main/packages/adapter-env).

## License

<a name="license"></a>

This project is licensed under the MIT License - see the [LICENSE file](https://github.com/Matii96/unifig/tree/main/LICENSE) for details.
