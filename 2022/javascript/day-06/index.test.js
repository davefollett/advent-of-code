import {
  part1,
  part2,
  fourUnique,
  isUnique,
} from './index.js';

const inputFilename = './day-06/input.txt';
const testInputFilename = './day-06/test-input.txt';

describe('@/day-06/index.js', () => {

  describe('fourUnique', () => {
    it('should return false if not all are unique', () => {
      const actual = fourUnique('m', 'j', 'q', 'j');
      expect(actual).toBe(false);
    });

    it('should return true if all are unique', () => {
      const actual = fourUnique('a', 'b', 'd', 'c');
      expect(actual).toBe(true);
    });
  });



  describe('part1()', () => {
    it('part1 should pass', () => {
      const answer = part1(inputFilename);
      expect(answer).toBe(1802);
    });

    it('part1 should pass test input', () => {
      const answer = part1(testInputFilename);
      expect(answer).toBe(7);
    });
  });

  describe('isUnique', () => {
    it('should return false if not all are unique', () => {
      const actual = isUnique('abcdefga');
      expect(actual).toBe(false);
    });

    it('should return true if all are unique', () => {
      const actual = isUnique('abcdefg');
      expect(actual).toBe(true);
    });
  });


  describe('part2()', () => {
    it('part2 should pass', () => {
      const answer = part2(inputFilename);
      expect(answer).toBe(3551);
    });

    it('part2 should pass test input', () => {
      const answer = part2(testInputFilename);
      expect(answer).toBe(19);
    });
  });
});
