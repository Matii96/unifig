import { DynamicModule, FactoryProvider, Module, Type } from '@nestjs/common';
import { Config, getNestedTemplates } from '@unifig/core';
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
    let providers = [
      ...(opts.default ? [opts.default] : []),
      ...(opts.templates ?? []),
    ].flatMap<FactoryProvider>((template) => this.mapToProviders(template));

    if (opts.default) {
      providers = providers.concat(
        getNestedTemplates(opts.default).flatMap((template) => [
          {
            provide: getConfigContainerToken(),
            useFactory: () => Config.getContainer(template),
          },
          {
            provide: template,
            useFactory: () => Config.getValues(template),
          },
        ]),
      );
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
   * @param {Type[]} templates
   * @returns {DynamicModule}
   */
  static forFeature(...templates: Type[]): DynamicModule {
    const providers = templates.flatMap<FactoryProvider>((template) =>
      this.mapToProviders(template),
    );
    return { module: ConfigModule, providers, exports: providers.map(({ provide }) => provide) };
  }

  private static mapToProviders(template: Type) {
    return getNestedTemplates(template).flatMap((template) => [
      {
        provide: getConfigContainerToken(template),
        useFactory: () => Config.getContainer(template),
      },
      {
        provide: template,
        useFactory: () => Config.getValues(template),
      },
    ]);
  }
}
