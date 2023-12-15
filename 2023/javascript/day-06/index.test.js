import { describe, expect, test } from 'vitest';
import {
  part1,
  part2,
} from './index.js';

const inputFilename = './day-06/input.txt';
const testInputFilename = './day-06/test-input.txt';

describe('@/day-06/index.js', () => {
  describe('part1()', () => {
    test('part1 should pass', () => {
      const answer = part1(inputFilename);
      expect(answer).toBe(1660968);
    });

    test('part1 should pass test input', () => {
      const answer = part1(testInputFilename);
      expect(answer).toBe(288);
    });
  });

  describe('part2()', () => {
    test('part2 should pass', () => {
      const answer = part2(inputFilename);
      expect(answer).toBe(26499773);
    });

    test('part2 should pass test input', () => {
      const answer = part2(testInputFilename);
      expect(answer).toBe(71503);
    });
  });
});
