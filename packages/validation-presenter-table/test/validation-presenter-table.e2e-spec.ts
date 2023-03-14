import { Config, PlainConfigAdapter } from '@unifig/core';
import { toTable } from '../lib';
import { TemplateMock } from './mocks';

describe('@unifig/validation-presenter-table (e2e)', () => {
  it('should format table from validation errors', async () => {
    const validationError = await Config.register({
      templates: [TemplateMock],
      enableImplicitConversion: false,
      adapter: new PlainConfigAdapter({ PORT: 'not-a-port', DB_PASSWORD: 'my-password' }),
    });
    expect(toTable(validationError!)).toMatchSnapshot();
  });
});
