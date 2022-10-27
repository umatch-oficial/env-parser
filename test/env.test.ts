import { Env, Validators } from '../src';

describe('Validators', () => {
  process.env.bool = 'true';

  const env = new Env({ bool: Validators.boolean() });

  test('Boolean', () => {
    expect(env.get('bool')).toBe(true);
  });
});
