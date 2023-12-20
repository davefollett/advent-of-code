import { describe, expect, test } from 'vitest';
import {
  part1,
  part2,
} from './index.js';

const inputFilename = './day-11/input.txt';
const testInputFilename = './day-11/test-input.txt';

describe('@/day-11/index.js', () => {
  describe('part1()', () => {
    test('part1 should pass test input', () => {
      const answer = part1(testInputFilename);
      expect(answer).toBe(374);
    });

    test('part1 should pass', () => {
      const answer = part1(inputFilename);
      expect(answer).toBe(9686930);
    });
  });

  describe('part2()', () => {
    test.skip('part2 should pass test input', () => {
      const answer = part2(testInputFilename);
      expect(answer).toBe(0);
    });

    test.skip('part2 should pass', () => {
      const answer = part2(inputFilename);
      expect(answer).toBe(0);
    });
  });
});
