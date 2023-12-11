import Grid from './grid.js';

const gridString = '\
467..114..\n\
...*......\n\
..35..633.\n\
......#...\n\
617*......\n\
.....+.58.\n\
..592.....\n\
......755.\n\
...$.*....\n\
.664.598..\
';

describe('@/utils/grid.js', () => {
  let grid;
  beforeEach(() => {
    grid = new Grid(gridString);
  });

  describe('class Grid', () => {
    it('numRows', () => {
      expect(grid.numRows).toBe(10);
    });

    it('numCols', () => {
      expect(grid.numCols).toBe(10);
    });

    it.each`
      location                | expected
      ${{ row: 0, col: 0 }}   | ${'4'}
      ${{ row: 4, col: 0 }}   | ${'6'}
      ${{ row: 6, col: 3 }}   | ${'9'}
      ${undefined}            | ${'4'}
    `('at()', ({ location, expected }) => {
      expect(grid.at(location)).toBe(expected);
    });

    it.each`
      location                | expected
      ${{ row: 0, col: 0 }}   | ${'4'}
      ${{ row: 4, col: 0 }}   | ${'6'}
      ${{ row: 6, col: 3 }}   | ${'9'}
    `('moveTo()', ({ location, expected }) => {
      expect(grid.moveTo(location)).toBe(expected);
      expect(grid.currentLocation).toStrictEqual(location);
    });
  });
});
