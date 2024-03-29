<h1 align="center">Unifig</h1>

<div align="center">

Universal, typed and validated configuration manager.

[![MIT Licensed](https://img.shields.io/badge/License-MIT-brightgreen)](/LICENSE)
[![NPM version](https://img.shields.io/npm/v/@unifig/core.svg)](https://www.npmjs.com/package/@unifig/core)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli)
[![codecov](https://codecov.io/gh/Matii96/unifig/branch/main/graph/badge.svg?token=B7P8F8GUU8)](https://codecov.io/gh/Matii96/unifig)
[![Build Status](https://github.com/Matii96/unifig/workflows/main-build/badge.svg?branch=main)](https://github.com/Matii96/unifig/actions?workflow=main-build)

</div>

## Table of Contents

- [Goal](#goal)
- [Packages](#packages)
- [Examples](#examples)
- [Local Development](#local_development)
  - [Building Packages](#local_development_building_packages)
  - [Testing](#local_development_testing)
  - [Committing](#local_development_committing)
- [Authors](#authors)
- [License](#license)

## 💡 Goal

<a name="goal"></a>

Unifig aims to provides simple and abstract way of handling app's configuration. It allows to load configuration data from multiple sources without changing defined config template. Many templates can be defined to further organize the code eg. MainConfiguration and ModuleConfiguration.

Adapted configuration data is transformed into templates and validated via [class-transformer](https://github.com/typestack/class-transformer) and [class-validator](https://github.com/typestack/class-validator). Once initialized configurations can be reloaded without app restart.

## Packages

<a name="packages"></a>

- [Core](https://github.com/Matii96/unifig/tree/main/packages/core) - project implementation for vanilla typescript
- [Nest](https://github.com/Matii96/unifig/tree/main/packages/nest) - nestjs integration
- [Adapter: env](https://github.com/Matii96/unifig/tree/main/packages/adapter-env) - adapter for environment variables and .env files
- [Validation presenter: table](https://github.com/Matii96/unifig/tree/main/packages/validation-presenter-table) - transforms configuration validation errors into table format
- [Validation presenter: JSON](https://github.com/Matii96/unifig/tree/main/packages/validation-presenter-json) - transforms configuration validation errors into JSON string

## Examples

<a name="examples"></a>

- [Express + typescript](https://github.com/Matii96/unifig/tree/main/examples/01-express)
- [NestJS](https://github.com/Matii96/unifig/tree/main/examples/02-nest)

## Local Development

<a name="local_development"></a>

Project uses [yarn workspaces](https://yarnpkg.com/features/workspaces) in combination with [lerna](https://lerna.js.org). To initialize the project run

```bash
yarn
```

### Building Packages

<a name="local_development_building_packages"></a>

As project uses typescript for the package to be seen as other packages dependency they need to be built first.

```bash
yarn build
```

### Testing

<a name="local_development_testing"></a>

```bash
yarn lint:staged  # linting staged files
yarn test         # running unit tests for packages changed since HEAD
yarn test:cov     # running unit tests for whole repo with coverage report
yarn test:e2e     # running e2e tests for packages changed since HEAD with packages dependent on them
yarn test:all     # combining test and test:e2e
```

### Committing

<a name="local_development_committing"></a>

The project follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0) standard. To conveniently create commit message use [commitizen](https://commitizen-tools.github.io/commitizen) by typing

```bash
yarn cz
```

## Authors

<a name="authors"></a>

**Mateusz Fonfara**

- Github: [@Matii96](https://github.com/Matii96)
- Medium: [@Matii96](https://medium.com/@matii96)

See also the full list of [contributors](https://github.com/Matii96/unifig/contributors).

## License

<a name="license"></a>

This project is licensed under the MIT License - see the [LICENSE file](https://github.com/Matii96/unifig/tree/main/LICENSE) for details.
