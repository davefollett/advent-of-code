import { describe, expect, test } from 'vitest';
import {
  part1,
  part2,
} from './index.js';

const inputFilename = './day-05/input.txt';
const testInputFilename = './day-05/test-input.txt';

describe('@/day-05/index.js', () => {
  describe('part1()', () => {
    test('part1 should pass', () => {
      const answer = part1(inputFilename);
      expect(answer).toBe(51752125);
    });

    test('part1 should pass test input', () => {
      const answer = part1(testInputFilename);
      expect(answer).toBe(35);
    });
  });

  describe('part2()', () => {
    test('part2 should pass', () => {
      const answer = part2(inputFilename);
      expect(answer).toBe(12634632);
    });

    test('part2 should pass test input', () => {
      const answer = part2(testInputFilename);
      expect(answer).toBe(46);
    });
  });
});
