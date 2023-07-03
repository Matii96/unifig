# JSON validation presenter for [Unifig](https://github.com/Matii96/unifig)

Transforms configuration validation errors into json string.

## JSON of contents

- [Installation](#installation)
- [Quick Start](#quick_start)
- [Example output](#example_output)
- [License](#license)

## Installation

<a name="installation"></a>

```bash
npm i @unifig/validation-presenter-json
# or
yarn add @unifig/validation-presenter-json
```

## Quick Start

<a name="quick_start"></a>

```ts
// main.ts
import { Config, PlainConfigAdapter } from '@unifig/core';
import { toJSON } from '@unifig/validation-presenter-json';

function bootstrap() {
  const validationError = Config.registerSync({
    templates: [StorageOptions, NetworkOptions],
    adapter: new PlainConfigAdapter({}),
  });
  if (validationError) {
    console.error(toJSON(validationError));
    process.exit(1);
  }
}

bootstrap();
```

## Example output

<a name="example_output"></a>

```json
[
  {
    "template": "TemplateMock",
    "errors": [
      {
        "property": "port",
        "type": "Number",
        "source": "PORT",
        "currentValue": "not-a-port",
        "failedConstraints": [{ "name": "isInt", "details": "port must be an integer number" }]
      },
      {
        "property": "db",
        "children": [
          {
            "property": "url",
            "type": "String",
            "source": "DB_URL",
            "failedConstraints": [{ "name": "isString", "details": "url must be a string" }]
          },
          {
            "property": "password",
            "type": "String",
            "source": "DB_PASSWORD",
            "failedConstraints": [{ "name": "isString", "details": "password must be a string" }]
          }
        ]
      }
    ]
  }
]
```

## License

<a name="license"></a>

This project is licensed under the MIT License - see the [LICENSE file](https://github.com/Matii96/unifig/tree/main/LICENSE) for details.
