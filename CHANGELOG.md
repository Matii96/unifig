# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
