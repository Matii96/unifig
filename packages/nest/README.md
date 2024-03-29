# NestJS integration for [Unifig](https://github.com/Matii96/unifig).

Utilizes Nest's DI system to manage configurations.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick_start)
  - [Caveats](#quick_start_caveats)
- [Multiple Configurations](#multiple_configurations)
- [Scoped Configurations](#scoped_configurations)
- [License](#license)

## Installation

<a name="installation"></a>

```bash
npm i @unifig/core @unifig/nest
# or
yarn add @unifig/core @unifig/nest
```

## Quick Start

<a name="quick_start"></a>

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { Config } from '@unifig/core';

async function bootstrap() {
  await Config.register({
    template: AppSettings,
    adapter: () => ({ port: 3000, helloMessage: 'hello world' }),
  });
  const { AppModule } = await import('./app.module');
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

```ts
// app.module.ts
@Module({
  imports: [ConfigModule.forRoot({ default: AppSettings })],
  providers: [AppService],
})
export class AppModule {}
```

After above setup configs containers are available to be injected by using

```ts
// app.service.ts
@Injectable()
export class AppService {
  constructor(@InjectConfig() private config: IConfigContainer<AppSettings>) {}

  sayHello() {
    return this.config.values.helloMessage;
  }
}
```

### Caveats

<a name="quick_start_caveats"></a>

Configurations need to be loaded before `AppModule` import in case of using global `Config` manager instance to configure application outside of Nest's DI.

An example would be [task scheduling](https://docs.nestjs.com/techniques/task-scheduling). Decorator `@Cron('45 * * * * *')` is being called at the moment of containing file import and needs the config to be already loaded.

## Multiple Configurations

<a name="multiple_configurations"></a>

```ts
// main.ts
...
await Config.register({
  templates: [AppSettings, AuthSettings, FilesStorageSettings],
  adapter: new PlainConfigAdapter({ ... }),
});
...
```

```ts
// app.module.ts
@Module({
  imports: [
    ConfigModule.forRoot({
      templates: [AuthSettings, FilesStorageSettings],
      default: AppSettings,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
```

```ts
// app.service.ts
@Injectable()
export class AppService {
  constructor(
    private appSettings: AppSettings, // <-- static values loaded only once on app bootstrap
    @InjectConfig() private appSettings: IConfigContainer<AppSettings>,
    @InjectConfig(AuthSettings) private authSettings: IConfigContainer<AnotherAppSettings>,
  ) {}
}
```

## Scoped Configurations

<a name="scoped_configurations"></a>

In addition to globally-accessible, configs can be injected with module scope.

```ts
// cats.module.ts
@Module({
  imports: [ConfigModule.forFeature(CatsConfig, OtherConfig)],
  providers: [CatsService],
})
export class CatsModule {}
```

```ts
// cats.service.ts
@Injectable()
export class CatsService {
  constructor(@InjectConfig(CatsConfig) private catsConfig: IConfigContainer<CatsConfig>) {}
}
```

## License

<a name="license"></a>

This project is licensed under the MIT License - see the [LICENSE file](https://github.com/Matii96/unifig/tree/main/LICENSE) for details.
