import {
  part1,
  part2,
} from './index.js';

const inputFilename = './day-08/input.txt';
const testInputFilename = './day-08/test-input.txt';
const testInputFilename2 = './day-08/test-input2.txt';

describe('@/day-08/index.js', () => {
  describe('part1()', () => {
    it('part1 should pass', () => {
      const answer = part1(inputFilename);
      expect(answer).toBe(22411);
    });

    it('part1 should pass test input', () => {
      const answer = part1(testInputFilename);
      expect(answer).toBe(6);
    });
  });

  describe('part2()', () => {
    it('part2 should pass', () => {
      const answer = part2(inputFilename);
      expect(answer).toBe(11188774513823);
    });

    it('part2 should pass test input', () => {
      const answer = part2(testInputFilename2);
      expect(answer).toBe(6);
    });
  });
});
