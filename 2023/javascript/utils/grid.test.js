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

/* eslint-disable-next-line no-multi-str */
const expectedRawForInsertRowsAndCols = '\
01=23=4=56789\n\
++=++=+=+++++\n\
90=12=3=45678\n\
89=01=2=34567\n\
++=++=+=+++++\n\
55=55=5=55555\n\
01=23=4=56789\n\
ZX=CV=B=NM<>?\n\
01=23=4=56789\n\
AB=AB=A=BABAB\n\
87=87=S=78787\n\
34=53=4=53450\
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

    describe('at()', () => {
      test.each`
        location                | expected
        ${{ row: 0, col: 0 }}   | ${'0'}
        ${{ row: 2, col: 1 }}   | ${'9'}
        ${{ row: 6, col: 3 }}   | ${'3'}
        ${undefined}            | ${'0'}
      `('returns $expected at $location', ({ location, expected }) => {
        expect(gridFromString.at(location)).toBe(expected);
        expect(gridFromFilename.at(location)).toBe(expected);
      });
    });

    describe('changeAt()', () => {
      test.each`
        location                    | value   | expected
        ${{ row: 0, col: 0 }}       | ${'X'}  | ${true}
        ${{ row: 2, col: 1 }}       | ${'Y'}  | ${true}
        ${{ row: 6, col: 3 }}       | ${'Z'}  | ${true}
      `('changes $location to $value', ({ location, value, expected }) => {
        expect(gridFromString.changeAt(location, value)).toBe(expected);
        expect(gridFromFilename.changeAt(location, value)).toBe(expected);
        expect(gridFromString.at(location)).toBe(value);
        expect(gridFromFilename.at(location)).toBe(value);
      });

      test.each`
        location                  | value   | expected
        ${{ row: -1, col: 3 }}    | ${'Z'}  | ${false}
        ${{ row: -3, col: 400 }}  | ${'S'}  | ${false}
      `('does not change $location to $value', ({ location, value, expected }) => {
        const origValueGridString = gridFromString.at(location)
        const origValueGridLocation = gridFromFilename.at(location)

        expect(gridFromString.changeAt(location, value)).toBe(expected);
        expect(gridFromFilename.changeAt(location, value)).toBe(expected);
        expect(gridFromString.at(location)).toBe(origValueGridString);
        expect(gridFromFilename.at(location)).toBe(origValueGridLocation);
      });
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
        /* eslint-disable-next-line prefer-destructuring */
        const numRows = gridFromString.numRows;
        /* eslint-disable-next-line prefer-destructuring */
        const numCols = gridFromString.numCols;
        const insertIndex = 1;
        const rowToInsert = Array(numCols).fill('+');
        expect(gridFromString.insertRow({ index: insertIndex, value: rowToInsert }));
        expect(gridFromFilename.insertRow({ index: insertIndex, value: rowToInsert }));
        expect(gridFromString.numRows).toBe(numRows + 1);
        expect(gridFromFilename.numRows).toBe(numRows + 1);
        expect(gridFromString.at({ row: 1, col: 2 })).toBe('+');
        expect(gridFromFilename.at({ row: 1, col: 2 })).toBe('+');
        expect(gridFromString.at({ row: 1, col: 5 })).toBe('+');
        expect(gridFromFilename.at({ row: 1, col: 5 })).toBe('+');
      });
    });

    describe('insertCol()', () => {
      test.skip('inserts 1 col', () => {
        /* eslint-disable-next-line prefer-destructuring */
        const numRows = gridFromString.numRows;
        /* eslint-disable-next-line prefer-destructuring */
        const numCols = gridFromString.numCols;
        const insertIndex = 1;
        const colToInsert = Array(numRows).fill('+');
        expect(gridFromString.insertCol({ index: insertIndex, value: colToInsert }));
        expect(gridFromFilename.insertCol({ index: insertIndex, value: colToInsert }));
        expect(gridFromString.numCols).toBe(numCols + 1);
        expect(gridFromFilename.numCols).toBe(numCols + 1);
        expect(gridFromString.at({ row: 0, col: 1 })).toBe('+');
        expect(gridFromFilename.at({ row: 0, col: 1 })).toBe('+');
        expect(gridFromString.at({ row: 5, col: 1 })).toBe('+');
        expect(gridFromFilename.at({ row: 5, col: 1 })).toBe('+');
      });
    });

    describe('insertRow() & insertCol()', () => {
      test('insert 2 rows & 3 cols', () => {
        const rowIndexes = [1, 3];
        const rowToInsert = Array(gridFromFilename.numCols).fill('+');
        expect(gridFromFilename.insertRow({ index: rowIndexes[0], value: rowToInsert }));
        expect(gridFromFilename.insertRow({ index: rowIndexes[1] + 1, value: rowToInsert }));

        const colIndexes = [2, 4, 5];
        const colToInsert = Array(gridFromFilename.numRows).fill('=');
        expect(gridFromFilename.insertCol({ index: colIndexes[0], value: colToInsert }));
        expect(gridFromFilename.insertCol({ index: colIndexes[1] + 1, value: colToInsert }));
        expect(gridFromFilename.insertCol({ index: colIndexes[2] + 2, value: colToInsert }));

        expect(gridFromFilename.raw).toBe(expectedRawForInsertRowsAndCols);
      });
    });

    // Experimental - Not fully tested
    describe('moveNext()', () => {
      test('move right first and then down', () => {
        const expected = '<>?012';
        let value = gridFromString.moveTo({ row: 5, col: 7 });
        value += gridFromString.moveNext('right', 'down');
        value += gridFromString.moveNext('right', 'down');
        value += gridFromString.moveNext('right', 'down');
        value += gridFromString.moveNext('right', 'down');
        value += gridFromString.moveNext('right', 'down');
        expect(value).toBe(expected);
      });

      test('move right first and then up', () => {
        const expected = 'BAB012';
        let value = gridFromString.moveTo({ row: 7, col: 7 });
        value += gridFromString.moveNext('right', 'up');
        value += gridFromString.moveNext('right', 'up');
        value += gridFromString.moveNext('right', 'up');
        value += gridFromString.moveNext('right', 'up');
        value += gridFromString.moveNext('right', 'up');
        expect(value).toBe(expected);
      });

      test.skip('move left first and then down', () => {
      });

      test.skip('move left first and then up', () => {
      });

      test.skip('move up first and then left', () => {
      });

      test.skip('move up first and then right', () => {
      });

      test.skip('move down first and then left', () => {
      });

      test.skip('move down first and then right', () => {
      });
    });
  });
});
