import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@unifig/nest';
import { AppController } from './app.controller';
import { AppOptions } from './app.options';
import { Config } from '@unifig/core';

describe('AppController', () => {
  let controller: AppController;

  beforeAll(() => {
    Config.registerSync({ template: AppOptions, adapter: () => ({ PORT: 3000 }) });
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(AppOptions)],
      controllers: [AppController],
    }).compile();

    controller = app.get<AppController>(AppController);
  });

  describe('ping', () => {
    it('should respond with pong', async () => {
      const response = await controller.pingDynamic();
      expect(response).toBe(`Pong from localhost:${Config.getValues(AppOptions).port}`);
    });
  });
});
