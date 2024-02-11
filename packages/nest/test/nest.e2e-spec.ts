import { Test, TestingModule } from '@nestjs/testing';
import { Config, PlainConfigAdapter } from '@unifig/core';
import { AppConfig } from './mocks/app.config';
import { AppModule } from './mocks/app.module';
import { CatsConfig } from './mocks/cats/cats.config';
import { CatsService } from './mocks/cats/cats.service';

describe('@unifig/nest (e2e)', () => {
  let service: CatsService;

  beforeEach(async () => {
    await Config.register(
      {
        template: AppConfig,
        adapter: new PlainConfigAdapter({ port: 3000, host: 'localhost' }),
      },
      {
        template: CatsConfig,
        adapter: new PlainConfigAdapter({ catsPort: 3000, catsHost: 'localhost' }),
      },
    );
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app = await moduleFixture.createNestApplication().init();

    service = app.get(CatsService);
  });

  it('should acquire global config container', () => {
    expect(service.appConfig.values).toEqual({ port: 3000, host: 'localhost' });
  });

  it('should acquire module-scoped config container', () => {
    expect(service.catsConfig.values).toEqual({ catsPort: 3000, catsHost: 'localhost' });
  });
});
