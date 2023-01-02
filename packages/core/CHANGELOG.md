# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.8.0](https://github.com/Matii96/unifig/compare/v0.7.0...v0.8.0) (2023-01-02)

**Note:** Version bump only for package @unifig/core

# [0.7.0](https://github.com/Matii96/unifig/compare/v0.6.1...v0.7.0) (2023-01-02)

### Features

- **core:** changed validation errors from POJOs to classes ([957330c](https://github.com/Matii96/unifig/commit/957330c2a8b45177bae4d81b71ca445e603491fe))
- **core:** compatibility with new versions of class-transformer ([689e26b](https://github.com/Matii96/unifig/commit/689e26b4190f81b5a555aa0a319552c8d2fa62da))
- **core:** new registration variations ([657220f](https://github.com/Matii96/unifig/commit/657220f6240ccd9ee9635eb2755bee3ad1fda7ff))
- **core:** validator rework ([acf2baf](https://github.com/Matii96/unifig/commit/acf2baf8084754b4ac33294b355e7419a7d161d3))

### BREAKING CHANGES

- **core:** Added new variation of register method - registerOrReject. Second one continues the
  current behavior whereas register returns validation exception or undefined in plac of throwing it.
- **core:** Rich validation report was removed from the exception itself and rich object
  containing abstract report was added in it's place. Register method doesn't throw validation
  exception and returns it if one occurs. To utilize previous behavior use registerOrReject method.

# [0.6.0](https://github.com/Matii96/unifig/compare/v0.5.1...v0.6.0) (2022-11-12)

### Features

- **core:** support for circular references between templates ([34d8ed5](https://github.com/Matii96/unifig/commit/34d8ed51e4820eb711bba8fdfa5a3042729f83cb))

## [0.5.1](https://github.com/Matii96/unifig/compare/v0.5.0...v0.5.1) (2022-11-02)

### Bug Fixes

- **core:** older class-transformer naming compatibility ([3df11a4](https://github.com/Matii96/unifig/commit/3df11a47e8b4d6cc9fb661bf64b178bd5a126a97))

# [0.5.0](https://github.com/Matii96/unifig/compare/v0.4.1...v0.5.0) (2022-11-01)

**Note:** Version bump only for package @unifig/core

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

### Features

- **core:** config manager rework ([bee49e3](https://github.com/Matii96/unifig/commit/bee49e396f83e6263d82b449515fe9ccd54babce))
- **core:** sharing config values sources ([#2](https://github.com/Matii96/unifig/issues/2)) ([5d8187c](https://github.com/Matii96/unifig/commit/5d8187c8b999b61b2dc7a02c7cf895c2313a66bc))

### BREAKING CHANGES

- **core:** new methods names in interface

## [0.2.2](https://github.com/Matii96/unifig/compare/v0.2.1...v0.2.2) (2022-10-17)

### Bug Fixes

- **core:** added missing index of exported files ([731f0c5](https://github.com/Matii96/unifig/commit/731f0c57ee8446b5c8b3e671bf59924e24f8e92d))

# 0.2.0 (2022-10-12)

### Bug Fixes

- **core:** added missing class-validator dependency ([6052855](https://github.com/Matii96/unifig/commit/60528552db7396b967907cd262cecb3612f7293a))

### Features

- **core:** improved manager interface ([cef08c7](https://github.com/Matii96/unifig/commit/cef08c77b380c5c063969821829adc309705f927))
- **core:** package setup ([cb2a066](https://github.com/Matii96/unifig/commit/cb2a066f4d40dfa31779cb187067f7134204ac3b))
- **core:** throwing exceptions upon encountering problems ([86b48d7](https://github.com/Matii96/unifig/commit/86b48d7166ba79a75755ade0a791271277d7c521))
- **env:** package setup ([5221aef](https://github.com/Matii96/unifig/commit/5221aeff7ac7b071619be5f6c9e537bb74cdacb8))

### BREAKING CHANGES

- **core:** changed getters names to more descriptive equivalents
