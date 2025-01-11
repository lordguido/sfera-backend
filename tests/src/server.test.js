import { expect, test, describe } from 'vitest';
import sum from '../../src/server';

const ZERO = 0;
const ONE = 1;
const TWO = 2;
const THREE = 3;
const NEGATIVE_ONE = -1;

describe('Server basic tests', () => {
  test('sum function should work correctly', () => {
    expect(sum(ONE, TWO)).toBe(THREE);
    expect(sum(NEGATIVE_ONE, ONE)).toBe(ZERO);
    expect(sum(ZERO, ZERO)).toBe(ZERO);
  });
});
