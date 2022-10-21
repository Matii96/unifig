import { ConfigModule } from './config.module';

describe('ConfigModule', () => {
  it('should configure root module with 1 default and 2 other templates', () => {
    const injectionsWithArgument = 3;
    const injectionsWithoutArgument = 1;
    expect(ConfigModule.forRoot({ default: class {}, templates: [class {}, class {}] }).providers).toHaveLength(
      injectionsWithArgument + injectionsWithoutArgument
    );
  });

  it('should configure feature module', () => {
    expect(ConfigModule.forFeature(class {}, class {}).providers).toHaveLength(2);
  });
});
