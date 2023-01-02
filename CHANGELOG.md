# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.8.0](https://github.com/Matii96/unifig/compare/v0.7.0...v0.8.0) (2023-01-02)

### Features

- **adapter-env:** package rename from @unifig/adapter-env ([a2a5cf6](https://github.com/Matii96/unifig/commit/a2a5cf6dbb8b11c54744a9c0bddfa6d7776be87b))

# [0.7.0](https://github.com/Matii96/unifig/compare/v0.6.1...v0.7.0) (2023-01-02)

### Features

- **core:** changed validation errors from POJOs to classes ([957330c](https://github.com/Matii96/unifig/commit/957330c2a8b45177bae4d81b71ca445e603491fe))
- **core:** compatibility with new versions of class-transformer ([689e26b](https://github.com/Matii96/unifig/commit/689e26b4190f81b5a555aa0a319552c8d2fa62da))
- **core:** new registration variations ([657220f](https://github.com/Matii96/unifig/commit/657220f6240ccd9ee9635eb2755bee3ad1fda7ff))
- **core:** validator rework ([acf2baf](https://github.com/Matii96/unifig/commit/acf2baf8084754b4ac33294b355e7419a7d161d3))
- **env:** adjusted to new ConfigAdapter interface ([46593b4](https://github.com/Matii96/unifig/commit/46593b48300e1328df9e7b061263b586856837a5))
- **nest:** adjusted to new ConfigContainer interface ([d729e93](https://github.com/Matii96/unifig/commit/d729e93c09851d005e8677f99a566403ccea2d9b))
- **validation-presenter-table:** package release ([ce81cb3](https://github.com/Matii96/unifig/commit/ce81cb34842ffc1b8941708dcbcdb43ed5b9470b))

### Performance Improvements

- **nest:** used Symbols for injection tokens ([7fca521](https://github.com/Matii96/unifig/commit/7fca5217f636a6cd5284fc8c8da7ba9152fe219f))

### BREAKING CHANGES

- **core:** Added new variation of register method - registerOrReject. Second one continues the
  current behavior whereas register returns validation exception or undefined in plac of throwing it.
- **core:** Rich validation report was removed from the exception itself and rich object
  containing abstract report was added in it's place. Register method doesn't throw validation
  exception and returns it if one occurs. To utilize previous behavior use registerOrReject method.

## [0.6.1](https://github.com/Matii96/unifig/compare/v0.6.0...v0.6.1) (2022-11-24)

### Bug Fixes

- corrected peer dependencies accepted versions ([f715f30](https://github.com/Matii96/unifig/commit/f715f309f074b39812439318cde05adf3a4743e8))

# [0.6.0](https://github.com/Matii96/unifig/compare/v0.5.1...v0.6.0) (2022-11-12)

### Features

- **core:** support for circular references between templates ([34d8ed5](https://github.com/Matii96/unifig/commit/34d8ed51e4820eb711bba8fdfa5a3042729f83cb))

## [0.5.1](https://github.com/Matii96/unifig/compare/v0.5.0...v0.5.1) (2022-11-02)

### Bug Fixes

- **core:** older class-transformer naming compatibility ([3df11a4](https://github.com/Matii96/unifig/commit/3df11a47e8b4d6cc9fb661bf64b178bd5a126a97))

# [0.5.0](https://github.com/Matii96/unifig/compare/v0.4.1...v0.5.0) (2022-11-01)

### Features

- **nest:** backwards compatibility with nest < 8.0.0 ([ebb4346](https://github.com/Matii96/unifig/commit/ebb434656a5969dbc83e58681bbee356c75d5b7f))

## [0.4.1](https://github.com/Matii96/unifig/compare/v0.4.0...v0.4.1) (2022-10-31)

### Bug Fixes

- **core:** any type for default property value ([06bf0bb](https://github.com/Matii96/unifig/commit/06bf0bb601aa7ce9925aa286e27c8f6dc0ccd058))

# [0.4.0](https://github.com/Matii96/unifig/compare/v0.3.1...v0.4.0) (2022-10-31)

### Bug Fixes

- **core:** nesting explicit typing ([3d5e194](https://github.com/Matii96/unifig/commit/3d5e1948eb0458dc8d0a53bf4db9c345a555e673))
- **core:** proper loading nested properties only templates ([8229c86](https://github.com/Matii96/unifig/commit/8229c86b4664f00832a72f596bfd7bdab073601b))

### Features

- **core:** option to define properties default values ([7e884ee](https://github.com/Matii96/unifig/commit/7e884ee2120734ca4fa497b9348c4d15004f0967))

## [0.3.1](https://github.com/Matii96/unifig/compare/v0.3.0...v0.3.1) (2022-10-22)

### Bug Fixes

- **core:** typo fix for quick start ([6e5c9a5](https://github.com/Matii96/unifig/commit/6e5c9a5ed19bbc9fdf2b2f8431ecd9fedfcfa1c7))

# [0.3.0](https://github.com/Matii96/unifig/compare/v0.2.3...v0.3.0) (2022-10-22)

### Bug Fixes

- **core:** configValidationException message formatting ([2b8c9f8](https://github.com/Matii96/unifig/commit/2b8c9f88d73bd47413a9fc4ed18728aa43625f33))
- **nest:** ensured no templates names overlap ([fea793e](https://github.com/Matii96/unifig/commit/fea793ea4b094005d426b847afb74bf0b3889618))

### Features

- **core:** config manager rework ([bee49e3](https://github.com/Matii96/unifig/commit/bee49e396f83e6263d82b449515fe9ccd54babce))
- **core:** sharing config values sources ([#2](https://github.com/Matii96/unifig/issues/2)) ([5d8187c](https://github.com/Matii96/unifig/commit/5d8187c8b999b61b2dc7a02c7cf895c2313a66bc))
- **env:** added support for glob path patterns ([#3](https://github.com/Matii96/unifig/issues/3)) ([edbdc5f](https://github.com/Matii96/unifig/commit/edbdc5fc110e865319a4ec78c83580817058fb58))
- **env:** allowed empty adapter options ([551afc1](https://github.com/Matii96/unifig/commit/551afc10f1a2ad35f78f6c750ffb6a467b0c7adb))
- **nest:** config module initialization rework ([c7330fc](https://github.com/Matii96/unifig/commit/c7330fcf765dc9fae991377a1a075ab02494b760))

### BREAKING CHANGES

- **nest:** new forRoot method interface
- **core:** new methods names in interface

## [0.2.3](https://github.com/Matii96/unifig/compare/v0.2.2...v0.2.3) (2022-10-17)

### Bug Fixes

- **nest:** added missing InjectConfig decorator export ([8716e4f](https://github.com/Matii96/unifig/commit/8716e4fdb53c39c028f4d92fee619cfed53de7a7))

## [0.2.2](https://github.com/Matii96/unifig/compare/v0.2.1...v0.2.2) (2022-10-17)

### Bug Fixes

- **core:** added missing index of exported files ([731f0c5](https://github.com/Matii96/unifig/commit/731f0c57ee8446b5c8b3e671bf59924e24f8e92d))

## [0.2.1](https://github.com/Matii96/unifig/compare/v0.2.0...v0.2.1) (2022-10-17)

### Bug Fixes

- **nest:** added missing index of exported files ([ccce631](https://github.com/Matii96/unifig/commit/ccce63105a8b5add1010b5deb03584d4b9fdb3d4))

# 0.2.0 (2022-10-12)

### Bug Fixes

- **core:** added missing class-validator dependency ([6052855](https://github.com/Matii96/unifig/commit/60528552db7396b967907cd262cecb3612f7293a))

### Features

- **core:** improved manager interface ([cef08c7](https://github.com/Matii96/unifig/commit/cef08c77b380c5c063969821829adc309705f927))
- **core:** package setup ([cb2a066](https://github.com/Matii96/unifig/commit/cb2a066f4d40dfa31779cb187067f7134204ac3b))
- **core:** throwing exceptions upon encountering problems ([86b48d7](https://github.com/Matii96/unifig/commit/86b48d7166ba79a75755ade0a791271277d7c521))
- **env:** package setup ([5221aef](https://github.com/Matii96/unifig/commit/5221aeff7ac7b071619be5f6c9e537bb74cdacb8))
- **nest:** package setup ([22febe9](https://github.com/Matii96/unifig/commit/22febe9dd3938f2c32a8ffce0f0b6281d06c7159))

### BREAKING CHANGES

- **core:** changed getters names to more descriptive equivalents
