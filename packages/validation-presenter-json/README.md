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

async function bootstrap() {
  const validationError = await Config.register({
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
    "template": "StorageOptions",
    "errors": [
      {
        "property": "port",
        "source": "PORT",
        "currentValue": "not-a-port",
        "failedConstraints": [
          {
            "details": "port must be an integer number",
            "name": "isInt"
          }
        ]
      },
      {
        "property": "db",
        "children": [
          {
            "property": "url",
            "source": "DB_URL",
            "failedConstraints": [
              {
                "details": "url must be a string",
                "name": "isString"
              }
            ]
          },
          {
            "property": "password",
            "source": "DB_PASSWORD",
            "failedConstraints": [
              {
                "details": "password must be a string",
                "name": "isString"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "template": "NetworkOptions",
    "errors": [
      {
        "property": "ipRange",
        "failedConstraints": [
          {
            "details": "ipRange must be defined",
            "name": "isDefined"
          }
        ],
        "children": []
      }
    ]
  }
]
```

## License

<a name="license"></a>

This project is licensed under the MIT License - see the [LICENSE file](https://github.com/Matii96/unifig/tree/main/LICENSE) for details.
