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
import { toTable } from '@unifig/validation-presenter-table';

async function bootstrap() {
  const validationError = await Config.register({
    templates: [StorageOptions, NetworkOptions],
    adapter: new PlainConfigAdapter({}),
  });
  if (validationError) {
    console.error(toTable(validationError));
    process.exit(1);
  }
}

bootstrap();
```

## Example output

<a name="example_output"></a>

```
┌──────────────────┬─────────────┬────────┬─────────────┬───────────────┬────────────────────┐
│ Template         │ Property    │ Type   │ Source      │ Current Value │ Failed constraints │
├──────────────────┼─────────────┼────────┼─────────────┼───────────────┼────────────────────┤
│                  │ port        │ Number │ PORT        │ "not-a-port"  │ isInt              │
│                  ├─────────────┼────────┼─────────────┼───────────────┼────────────────────┤
│ TemplateMock     │ db.url      │ String │ DB_URL      │ undefined     │ isString           │
│                  ├─────────────┼────────┼─────────────┼───────────────┼────────────────────┤
│                  │ db.password │ String │ DB_PASSWORD │ undefined     │ isString           │
└──────────────────┴─────────────┴────────┴─────────────┴───────────────┴────────────────────┘
```

`Source` column presents where property value was taken from.

Example: from env variables in case of [Env Adapter](https://github.com/Matii96/unifig/tree/main/packages/adapter-env).

## License

<a name="license"></a>

This project is licensed under the MIT License - see the [LICENSE file](https://github.com/Matii96/unifig/tree/main/LICENSE) for details.
