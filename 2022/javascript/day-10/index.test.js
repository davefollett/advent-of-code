import {
  part1,
  part2,
} from './index.js';

const inputFilename = './day-10/input.txt';
const testInputFilename = './day-10/test-input.txt';

describe('@/day-10/index.js', () => {
  describe('part1()', () => {
    it('part1 should pass', () => {
      const answer = part1(inputFilename);
      expect(answer).toBe(13920);
    });

    it('part1 should pass test input', () => {
      const answer = part1(testInputFilename);
      expect(answer).toBe(13140);
    });
  });

  describe('part2()', () => {
    it('part2 should pass', () => {
      const answer = part2(inputFilename);
      const expected = `
####..##..#....#..#.###..#....####...##.
#....#..#.#....#..#.#..#.#....#.......#.
###..#....#....####.###..#....###.....#.
#....#.##.#....#..#.#..#.#....#.......#.
#....#..#.#....#..#.#..#.#....#....#..#.
####..###.####.#..#.###..####.#.....##..`;
      expect(answer).toBe(expected);
    });

    it('part2 should pass test input', () => {
      const answer = part2(testInputFilename);
      const expected = `
##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`;
      expect(answer).toBe(expected);
    });
  });
});
