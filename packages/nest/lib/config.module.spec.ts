import { ConfigModule } from './config.module';

describe('ConfigModule', () => {
  it('should configure root module with 1 default and 2 other templates', () => {
    const injectionsWithArgument = 3 * 2; // *2 as both container and template is provided
    const injectionsWithoutArgument = 1 * 2;
    expect(
      ConfigModule.forRoot({ default: class {}, templates: [class {}, class {}] }).providers,
    ).toHaveLength(injectionsWithArgument + injectionsWithoutArgument);
  });

  it('should configure feature module', () => {
    expect(ConfigModule.forFeature(class {}, class {}).providers).toHaveLength(2 * 2);
  });
});
