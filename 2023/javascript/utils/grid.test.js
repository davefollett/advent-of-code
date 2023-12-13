import Grid from './grid.js';

const gridString = '\
0123456789\n\
9012345678\n\
8901234567\n\
5555555555\n\
0123456789\n\
ZXCVBNM<>?\n\
0123456789\n\
ABABABABAB\n\
8787S78787\n\
3453453450\
';

const gridFilename = './utils/files/grid.txt';

describe('@/utils/grid.js', () => {
  let gridFromString;
  let gridFromFilename;

  beforeEach(() => {
    gridFromString = new Grid({ gridString });
    gridFromFilename = new Grid({ gridFilename });
  });

  describe('class Grid', () => {
    it('numRows', () => {
      expect(gridFromString.numRows).toBe(10);
      expect(gridFromFilename.numRows).toBe(10);
    });

    it('numCols', () => {
      expect(gridFromString.numCols).toBe(10);
      expect(gridFromFilename.numCols).toBe(10);
    });

    it.each`
      location                | expected
      ${{ row: 0, col: 0 }}   | ${'0'}
      ${{ row: 2, col: 1 }}   | ${'9'}
      ${{ row: 6, col: 3 }}   | ${'3'}
      ${undefined}            | ${'0'}
    `('at()', ({ location, expected }) => {
      expect(gridFromString.at(location)).toBe(expected);
      expect(gridFromFilename.at(location)).toBe(expected);
    });

    it.each`
      location                | expected
      ${{ row: 0, col: 0 }}   | ${'0'}
      ${{ row: 5, col: 1 }}   | ${'X'}
      ${{ row: 9, col: 8 }}   | ${'5'}
    `('moveTo()', ({ location, expected }) => {
      expect(gridFromString.moveTo(location)).toBe(expected);
      expect(gridFromString.currentLocation).toStrictEqual(location);
      expect(gridFromFilename.moveTo(location)).toBe(expected);
      expect(gridFromFilename.currentLocation).toStrictEqual(location);
    });

    it('find()', () => {
      const expected = { row: 8, col: 4 };
      expect(gridFromString.find('S')).toStrictEqual(expected);
      expect(gridFromFilename.find('S')).toStrictEqual(expected);
    });
  });
});
