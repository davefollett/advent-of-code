/* eslint-disable object-curly-newline */
import {
  part1,
  part2,
} from './index.js';

const inputFilename = './day-08/input.txt';
const testInputFilename = './day-08/test-input.txt';

describe('@/day-08/index.js', () => {
  describe('part1()', () => {
    it.skip('part1 should pass', () => {
      const answer = part1(inputFilename);
      expect(answer).toBe(0);
    });

    it('part1 should pass test input', () => {
      const answer = part1(testInputFilename);
      expect(answer).toBe(0);
    });
  });

  describe('part2()', () => {
    it.skip('part2 should pass', () => {
      const answer = part2(inputFilename);
      expect(answer).toBe(0);
    });

    it.skip('part2 should pass test input', () => {
      const answer = part2(testInputFilename);
      expect(answer).toBe(0);
    });
  });
});
/* eslint-enable object-curly-newline */
