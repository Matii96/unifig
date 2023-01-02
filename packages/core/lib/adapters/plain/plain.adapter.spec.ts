import { ConfigAdapter } from '../adapter';
import { PlainConfigAdapter } from './plain.adapter';

describe('PlainConfigAdapter', () => {
  const plain = { PORT: 3000, DB_URL: 'db://localhost', DB_PASSWORD: 'password' };
  let adapter: ConfigAdapter;

  beforeEach(() => {
    adapter = new PlainConfigAdapter(plain);
  });

  it('should load object from argument', async () => {
    expect(await adapter.load()).toEqual(plain);
  });
});
