import { describe, expect, test } from 'vitest';
import {
  part1,
  part2,
} from './index.js';

const inputFilename = './day-15/input.txt';
const testInputFilename = './day-15/test-input.txt';

describe('@/day-15/index.js', () => {
  describe('part1()', () => {
    test('part1 should pass test input', () => {
      const answer = part1(testInputFilename);
      expect(answer).toBe(1320);
    });

    test('part1 should pass', () => {
      const answer = part1(inputFilename);
      expect(answer).toBe(515210);
    });
  });

  describe('part2()', () => {
    test('part2 should pass test input', () => {
      const answer = part2(testInputFilename);
      expect(answer).toBe(145);
    });

    test('part2 should pass', () => {
      const answer = part2(inputFilename);
      expect(answer).toBe(246762);
    });
  });
});
