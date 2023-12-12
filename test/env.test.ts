import { Env, Validators } from '../src';

describe('Validators', () => {
  describe('Base', () => {
    process.env.optional = '1';

    const env = new Env({
      optional: Validators.number().optional(),
      optionalDefault: Validators.number().optional(2),
      optionalEmtpy: Validators.number().optional(),
    });
    test('optional works', () => {
      expect(env.get('optional')).toBe(1);
      expect(env.get('optionalDefault')).toBe(2);
      expect(env.get('optionalEmtpy')).toBeUndefined();
    });
    test('missing value', () => {
      expect(() => new Env({ invalid: Validators.number() })).toThrow(
        /^Error validating env vars:/,
      );
    });
  });

  describe('Array', () => {
    process.env.array = '[1,2,3]';
    process.env.invalidArray = '[1,2,3';
    process.env.nonArray = '{}';
    test('works', () => {
      expect(Validators.number().array().validate('array')).toEqual([1, 2, 3]);
    });
    test('minLength parameter', () => {
      expect(() => Validators.number().array({ minLength: 4 }).validate('array')).toThrow(
        /array too short/,
      );
    });
    test('maxLength parameter', () => {
      expect(() => Validators.number().array({ maxLength: 2 }).validate('array')).toThrow(
        /array too long/,
      );
    });
    test('minLength and maxLength parameters', () => {
      expect(() =>
        Validators.number().array({ minLength: 4, maxLength: 2 }).validate('array'),
      ).toThrow(/array too short|array too long/);
    });
    test('not an array', () => {
      expect(() => Validators.number().array().validate('nonArray')).toThrow(
        /not an array/,
      );
    });
    test('invalid array', () => {
      expect(() => Validators.number().array().validate('invalidArray')).toThrow(
        /^Unexpected/,
      );
    });
  });

  describe('Boolean', () => {
    process.env.bool = 'true';
    test('works', () => {
      expect(Validators.boolean().validate('bool')).toBe(true);
    });
  });

  describe('Number', () => {
    process.env.num = '123';
    test('works', () => {
      expect(Validators.number().validate('num')).toBe(123);
    });
    test('min parameter', () => {
      expect(() => Validators.number({ min: 124 }).validate('num')).toThrow(/too small/);
    });
    test('max parameter', () => {
      expect(() => Validators.number({ max: 122 }).validate('num')).toThrow(/too large/);
    });
    test('min and max parameters', () => {
      expect(() => Validators.number({ min: 124, max: 122 }).validate('num')).toThrow(
        /too small|too large/,
      );
    });
  });

  describe('Port', () => {
    process.env.port = '25565';
    test('works', () => {
      expect(Validators.port().validate('port')).toBe(25565);
    });
  });

  describe('String', () => {
    process.env.str = 'hello ';
    test('works', () => {
      expect(Validators.string().validate('str')).toBe('hello ');
    });
    test('not a number', () => {
      expect(() => Validators.number().validate('str')).toThrow(/not a number/);
    });
    test('min parameter', () => {
      expect(() => Validators.string({ minLength: 7 }).validate('str')).toThrow(
        /too short/,
      );
    });
    test('max parameter', () => {
      expect(() => Validators.string({ maxLength: 5 }).validate('str')).toThrow(
        /too long/,
      );
    });
    test('min and max parameters', () => {
      expect(() =>
        Validators.string({ minLength: 7, maxLength: 5 }).validate('str'),
      ).toThrow(/too short|too long/);
    });
  });
});
