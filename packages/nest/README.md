# NestJS integration for [Unifig](https://github.com/Matii96/unifig).

Utilizes Nest's DI system to manage configurations.

## Table of contents

- [Installation](#installation)
- [Quick Start](#quick_start)
  - [Caveats](#quick_start_caveats)
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
// app.config.ts
export class AppConfig {
  @IsInt()
  port: number;

  @IsString()
  helloMessage: string;
}
```

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { Config, PlainConfigAdapter } from '@unifig/core';

async function bootstrap() {
  await Config.register({
    template: AppConfig,
    adapter: new PlainConfigAdapter({ port: 3000, helloMessage: 'hello world' }),
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
  imports: [ConfigModule.forRoot(AppConfig)],
  providers: [AppService],
})
export class AppModule {}
```

After above setup configs containers are available to be injected by using

```ts
// app.service.ts
@Injectable()
export class AppService {
  constructor(@InjectConfig() private config: ConfigContainer<AppConfig>) {}

  sayHello() {
    return this.config.values.helloMessage;
  }
}
```

### Caveats

<a name="quick_start_caveats"></a>

Configurations need to be loaded before `AppModule` import in case of using global `Config` manager instance to configure application outside of Nest's DI.

An example would be [task scheduling](https://docs.nestjs.com/techniques/task-scheduling). Decorator `@Cron('45 * * * * *')` is being called at the moment of .ts file import and needs the config to be already loaded.

## Scoped Configurations

<a name="scoped_configurations"></a>

In addition to globally-accessible, configs can be injected with module scope.

```ts
// cats.module.ts
@Module({
  imports: [ConfigModule.forFeature(CatsConfig)],
  providers: [CatsService],
})
export class CatsModule {}
```

```ts
// cats.service.ts
@Injectable()
export class CatsService {
  constructor(@InjectConfig(CatsConfig) private catsConfig: ConfigContainer<CatsConfig>) {}
}
```

## License

<a name="license"></a>

This project is licensed under the MIT License - see the [LICENSE file](https://github.com/Matii96/nodiator/tree/main/LICENSE) for details.
