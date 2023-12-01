import {
  part1,
  part2,
} from './index.js';

const inputFilename = './day-01/input.txt';
const testInputFilename = './day-01/test-input.txt';
const testInputFilename2 = './day-01/test-input2.txt';

describe('@/day-01/index.js', () => {
  describe('part1()', () => {
    it('part1 should pass', () => {
      const answer = part1(inputFilename);
      expect(answer).toBe(54159);
    });

    it('part1 should pass test input', () => {
      const answer = part1(testInputFilename);
      expect(answer).toBe(142);
    });
  });

  describe('part2()', () => {
    // 53900 is too high
    it('part2 should pass', () => {
      const answer = part2(inputFilename);
      expect(answer).toBe(53866);
    });

    it('part2 should pass test input', () => {
      const answer = part2(testInputFilename2);
      expect(answer).toBe(281);
    });
  });
});
