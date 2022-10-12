import { DynamicModule, FactoryProvider, Module, Type } from '@nestjs/common';
import { Config } from '@unifig/core';
import { getConfigContainerToken } from './injection/get-config-container-token.factory';

@Module({})
export class ConfigModule {
  /**
   * Register global configurations.
   * @param {Type<any>} defaultTemplate
   * @param {Type<any>[]} templates
   * @returns {DynamicModule}
   */
  static forRoot(defaultTemplate: Type<any>, ...templates: Type<any>[]): DynamicModule {
    const providers = [defaultTemplate, ...templates].map<FactoryProvider>((template) => ({
      provide: getConfigContainerToken(template),
      useFactory: () => Config.container(template),
    }));
    providers.push({
      provide: getConfigContainerToken(),
      useFactory: () => Config.container(defaultTemplate),
    });
    return { global: true, module: ConfigModule, providers, exports: providers.map(({ provide }) => provide) };
  }

  /**
   * Register module-scoped configurations.
   * @param {Type<any>[]} templates
   * @returns {DynamicModule}
   */
  static forFeature(...templates: Type<any>[]): DynamicModule {
    const providers = templates.map<FactoryProvider>((template) => ({
      provide: getConfigContainerToken(template),
      useFactory: () => Config.container(template),
    }));
    return { module: ConfigModule, providers, exports: providers.map(({ provide }) => provide) };
  }
}
