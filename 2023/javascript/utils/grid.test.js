import {
  describe,
  expect,
  test,
  beforeEach,
} from 'vitest';
import Grid from './grid.js';

/* eslint-disable-next-line no-multi-str */
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
    test('numRows', () => {
      expect(gridFromString.numRows).toBe(10);
      expect(gridFromFilename.numRows).toBe(10);
    });

    test('numCols', () => {
      expect(gridFromString.numCols).toBe(10);
      expect(gridFromFilename.numCols).toBe(10);
    });

    test.each`
      location                | expected
      ${{ row: 0, col: 0 }}   | ${'0'}
      ${{ row: 2, col: 1 }}   | ${'9'}
      ${{ row: 6, col: 3 }}   | ${'3'}
      ${undefined}            | ${'0'}
    `('at()', ({ location, expected }) => {
      expect(gridFromString.at(location)).toBe(expected);
      expect(gridFromFilename.at(location)).toBe(expected);
    });

    test.each`
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

    test('find()', () => {
      const expected = { row: 8, col: 4 };
      expect(gridFromString.find('S')).toStrictEqual(expected);
      expect(gridFromFilename.find('S')).toStrictEqual(expected);
    });

    describe('findAll()', () => {
      test('returns an array of locations', () => {
        const expected = [
          { row: 0, col: 1 },
          { row: 1, col: 2 },
          { row: 2, col: 3 },
          { row: 4, col: 1 },
          { row: 6, col: 1 },
        ];
        expect(gridFromString.findAll('1')).toStrictEqual(expected);
        expect(gridFromFilename.findAll('1')).toStrictEqual(expected);
      });

      test('returns [] if value not found', () => {
        const expected = [];
        expect(gridFromString.findAll('W')).toStrictEqual(expected);
        expect(gridFromFilename.findAll('W')).toStrictEqual(expected);
      });
    });

    describe('distanceBetween()', () => {
      test.each`
        locationA              | locationB              | expected
        ${{ row: 0, col: 0 }}  | ${{ row: 0, col: 0 }}  | ${0}
        ${{ row: 0, col: 0 }}  | ${{ row: 0, col: 1 }}  | ${1}
        ${{ row: 3, col: 1 }}  | ${{ row: 5, col: 7 }}  | ${8}
      `('returns the correct distance between locations', ({ locationA, locationB, expected }) => {
        expect(Grid.distanceBetween(locationA, locationB)).toBe(expected);
      });
    });

    describe('findAllRows()', () => {
      test.each`
        value                                                  | expected
        ${['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}  | ${[0, 4, 6]}
        ${['5', '5', '5', '5', '5', '5', '5', '5', '5', '5']}  | ${[3]}
        ${['8', '9', '0', '1', '2', '3', '4', '5', '6', '7']}  | ${[2]}
      `('returns all matching row indexes', ({ value, expected }) => {
        expect(gridFromString.findAllRows(value)).toStrictEqual(expected);
        expect(gridFromFilename.findAllRows(value)).toStrictEqual(expected);
      });
    });

    describe('findAllCols()', () => {
      test.each`
        value                                                  | expected
        ${['9', '8', '7', '5', '9', '?', '9', 'B', '7', '0']}  | ${[9]}
        ${['1', '0', '9', '5', '1', 'X', '1', 'B', '7', '4']}  | ${[1]}
      `('returns all matching col indexes', ({ value, expected }) => {
        expect(gridFromString.findAllCols(value)).toStrictEqual(expected);
        expect(gridFromFilename.findAllCols(value)).toStrictEqual(expected);
      });
    });

    describe('insertRow()', () => {
      test.skip('inserts 1 row', () => {
        const numRows = gridFromString.numRows;
        const numCols = gridFromString.numCols;
        const insertIndex = 1;
        const rowToInsert = Array(numCols).fill('+');
        expect(gridFromString.insertRow({ index: insertIndex, value: rowToInsert}));
        expect(gridFromFilename.insertRow({ index: insertIndex, value: rowToInsert}));
        expect(gridFromString.numRows).toBe(numRows + 1);
        expect(gridFromFilename.numRows).toBe(numRows + 1);
        expect(gridFromString.at({ row: 1, col: 2})).toBe('+');
        expect(gridFromFilename.at({ row: 1, col: 2})).toBe('+');
        expect(gridFromString.at({ row: 1, col: 5})).toBe('+');
        expect(gridFromFilename.at({ row: 1, col: 5})).toBe('+');
      });
    });

    describe('insertCol()', () => {
      test.skip('inserts 1 col', () => {
        const numRows = gridFromString.numRows;
        const numCols = gridFromString.numCols;
        const insertIndex = 1;
        const colToInsert = Array(numRows).fill('+');
        expect(gridFromString.insertCol({ index: insertIndex, value: colToInsert}));
        expect(gridFromFilename.insertCol({ index: insertIndex, value: colToInsert}));
        expect(gridFromString.numCols).toBe(numCols + 1);
        expect(gridFromFilename.numCols).toBe(numCols + 1);
        expect(gridFromString.at({ row: 0, col: 1})).toBe('+');
        expect(gridFromFilename.at({ row: 0, col: 1})).toBe('+');
        expect(gridFromString.at({ row: 5, col: 1})).toBe('+');
        expect(gridFromFilename.at({ row: 5, col: 1})).toBe('+');
      });
    });
  });
});
