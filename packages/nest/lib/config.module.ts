import { DynamicModule, FactoryProvider, Module, Type } from '@nestjs/common';
import { Config } from '@unifig/core';
import { getConfigContainerToken } from './injection/get-config-container-token.factory';
import { ConfigModuleForRootOptions } from './config.module.options';

@Module({})
export class ConfigModule {
  /**
   * Register global configurations.
   * @param {ConfigModuleForRootOptions} opts
   * @returns {DynamicModule}
   */
  static forRoot(opts: ConfigModuleForRootOptions): DynamicModule {
    const providers = [
      ...(opts.default ? [opts.default] : []),
      ...(opts.templates ?? []),
    ].map<FactoryProvider>((template) => ({
      provide: getConfigContainerToken(template),
      useFactory: () => Config.getContainer(template),
    }));
    if (opts.default) {
      providers.push({
        provide: getConfigContainerToken(),
        useFactory: () => Config.getContainer(opts.default as Type<any>),
      });
    }
    return {
      global: true,
      module: ConfigModule,
      providers,
      exports: providers.map(({ provide }) => provide),
    };
  }

  /**
   * Register module-scoped configurations.
   * @param {Type<any>[]} templates
   * @returns {DynamicModule}
   */
  static forFeature(...templates: Type<any>[]): DynamicModule {
    const providers = templates.map<FactoryProvider>((template) => ({
      provide: getConfigContainerToken(template),
      useFactory: () => Config.getContainer(template),
    }));
    return { module: ConfigModule, providers, exports: providers.map(({ provide }) => provide) };
  }
}
