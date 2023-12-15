import { describe, expect, test } from 'vitest';
import {
  part1,
  part2,
} from './index.js';

const inputFilename = './day-10/input.txt';
const testInputFilename = './day-10/test-input.txt';
const testInputFilename2 = './day-10/test-input2.txt';

describe('@/day-10/index.js', () => {
  describe('part1()', () => {
    test('part1 should pass test input', () => {
      const answer = part1(testInputFilename);
      expect(answer).toBe(4);
    });

    test('part1 should pass test input 2', () => {
      const answer = part1(testInputFilename2);
      expect(answer).toBe(8);
    });

    test('part1 should pass', () => {
      const answer = part1(inputFilename);
      expect(answer).toBe(6649);
    });
  });

  describe('part2()', () => {
    test.skip('part2 should pass test input', () => {
      const answer = part2(testInputFilename2);
      expect(answer).toBe(0);
    });

    test.skip('part2 should pass', () => {
      const answer = part2(inputFilename);
      expect(answer).toBe(0);
    });
  });
});
