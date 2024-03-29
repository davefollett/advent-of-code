import {
  part1,
  part2,
} from './index.js';

const inputFilename = './day-04/input.txt';
const testInputFilename = './day-04/test-input.txt';

describe('@/day-04/index.js', () => {
  describe('part1()', () => {
    it('part1 should pass', () => {
      const answer = part1(inputFilename);
      expect(answer).toBe(494);
    });

    it('part1 should pass test input', () => {
      const answer = part1(testInputFilename);
      expect(answer).toBe(2);
    });
  });

  describe('part2()', () => {
    it('part2 should pass', () => {
      const answer = part2(inputFilename);
      expect(answer).toBe(833);
    });

    it('part2 should pass test input', () => {
      const answer = part2(testInputFilename);
      expect(answer).toBe(4);
    });
  });
});
