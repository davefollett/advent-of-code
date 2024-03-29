import { describe, expect, test } from 'vitest';
import {
  part1,
  part2,
} from './index.js';

const inputFilename = './day-02/input.txt';
const testInputFilename = './day-02/test-input.txt';

describe('@/day-02/index.js', () => {
  describe('part1()', () => {
    test('part1 should pass', () => {
      const answer = part1(inputFilename);
      expect(answer).toBe(2439);
    });

    test('part1 should pass test input', () => {
      const answer = part1(testInputFilename);
      expect(answer).toBe(8);
    });
  });

  describe('part2()', () => {
    test('part2 should pass', () => {
      const answer = part2(inputFilename);
      expect(answer).toBe(63711);
    });

    test('part2 should pass test input', () => {
      const answer = part2(testInputFilename);
      expect(answer).toBe(2286);
    });
  });
});
