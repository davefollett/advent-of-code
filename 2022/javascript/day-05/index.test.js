import {
  part1,
  part2,
} from './index.js';

const inputFilename = './day-05/input.txt';
const testInputFilename = './day-05/test-input.txt';

describe('@/day-05/index.js', () => {
  describe('part1()', () => {
    it('part1 should pass', () => {
      const answer = part1(inputFilename);
      expect(answer).toBe('PTWLTDSJV');
    });

    it('part1 should pass test input', () => {
      const answer = part1(testInputFilename);
      expect(answer).toBe('CMZ');
    });
  });

  describe('part2()', () => {
    it('part2 should pass', () => {
      const answer = part2(inputFilename);
      expect(answer).toBe('WZMFVGGZP');
    });

    it('part2 should pass test input', () => {
      const answer = part2(testInputFilename);
      expect(answer).toBe('MCD');
    });
  });
});
