import {
  part1,
  part2,
} from './index.js';

const inputFilename = './day-03/input.txt';
const testInputFilename = './day-03/test-input.txt';

describe('@/day-03/index.js', () => {
  describe('part1()', () => {
    it('part1 should pass', () => {
      // too low - 510028
      // too low = 551521
      const answer = part1(inputFilename);
      expect(answer).toBe(554003);
    });

    it('part1 should pass test input', () => {
      const answer = part1(testInputFilename);
      expect(answer).toBe(4361);
    });
  });

  describe('part2()', () => {
    it('part2 should pass', () => {
      const answer = part2(inputFilename);
      expect(answer).toBe(87263515);
    });

    it('part2 should pass test input', () => {
      const answer = part2(testInputFilename);
      expect(answer).toBe(467835);
    });
  });
});
