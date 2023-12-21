import fs from 'fs';
import os from 'os';

export default class Grid {
  #grid;

  #gridRaw;

  #numRows;

  #numCols;

  #currentLocation;

  static equal(a, b) {
    if (!a || !b) { return false; }
    return a.row === b.row && a.col === b.col;
  }

  static notEqual(a, b) {
    return !Grid.equal(a, b);
  }

  static distanceBetween(locationA, locationB) {
    return Math.abs(locationA.row - locationB.row) + Math.abs(locationA.col - locationB.col);
  }

  constructor({ gridString, gridFilename }) {
    if (gridString) {
      this.#gridRaw = gridString;
    }

    if (gridFilename) {
      this.#gridRaw = fs.readFileSync(gridFilename, 'utf-8');
    }

    this.#grid = this.#gridRaw
      .split(os.EOL)
      .map((line) => line.split(''));

    this.#numRows = this.#grid.length;
    this.#numCols = this.#grid[0].length;
    this.#currentLocation = { row: 0, col: 0 };
  }

  #resetRaw() {
    const rowJoins = [];
    for (let row = 0; row < this.#grid.length; row += 1) {
      rowJoins.push(this.#grid[row].join(''));
    }
    this.#gridRaw = rowJoins.join('\n');
  }

  #validateRange({ row, col }) {
    if (row >= this.#numRows || row < 0) { return false; }
    if (col >= this.#numCols || col < 0) { return false; }

    return true;
  }

  get numRows() {
    return this.#numRows;
  }

  get numCols() {
    return this.#numCols;
  }

  get currentLocation() {
    return this.#currentLocation;
  }

  get raw() {
    return this.#gridRaw;
  }

  at({ row = this.#currentLocation.row, col = this.#currentLocation.col } = {}) {
    if (!this.#validateRange({ row, col })) { return null; }

    return this.#grid[row][col];
  }

  changeAt({ row, col }, value) {
    if (!this.#validateRange({ row, col })) { return false; }
    this.#grid[row][col] = value;
    return true;
  }

  find(value) {
    for (let row = 0; row < this.#grid.length; row += 1) {
      for (let col = 0; col < this.#grid[row].length; col += 1) {
        if (this.#grid[row][col] === value) {
          return { row, col };
        }
      }
    }
    return { row: -1, col: -1 };
  }

  /**
   * This function searches the grid for the provided value an returns all matches in an array.  If
   * the value is not found, an empty array is returned.
   *
   * @param {string} value The value to search for in the grid.
   * @returns An array of matching locations.
   */
  findAll(value) {
    const result = [];
    for (let row = 0; row < this.#grid.length; row += 1) {
      for (let col = 0; col < this.#grid[row].length; col += 1) {
        if (this.#grid[row][col] === value) {
          result.push({ row, col });
        }
      }
    }
    return result;
  }

  findAllRows(value) {
    const matchingRowIndexes = [];
    const valueString = value.join();
    for (let row = 0; row < this.#grid.length; row += 1) {
      if (valueString === this.#grid[row].join()) {
        matchingRowIndexes.push(row);
      }
    }
    return matchingRowIndexes;
  }

  findAllCols(value) {
    const matchingColIndexes = [];
    const valueString = value.join();

    for (let col = 0; col < this.#numCols; col += 1) {
      const colValues = [];
      for (let row = 0; row < this.#numRows; row += 1) {
        colValues.push(this.#grid[row][col]);
      }
      if (colValues.join() === valueString) {
        matchingColIndexes.push(col);
      }
    }
    return matchingColIndexes;
  }

  moveTo({ row, col }) {
    if (!this.#validateRange({ row, col })) { return null; }
    this.#currentLocation = { row, col };

    return this.at({ row, col });
  }

  moveUp() {
    return this.moveTo({ row: this.#currentLocation.row - 1, col: this.#currentLocation.col });
  }

  moveDown() {
    return this.moveTo({ row: this.#currentLocation.row + 1, col: this.#currentLocation.col });
  }

  moveLeft() {
    return this.moveTo({ row: this.#currentLocation.row, col: this.#currentLocation.col - 1 });
  }

  moveRight() {
    return this.moveTo({ row: this.#currentLocation.row, col: this.#currentLocation.col + 1 });
  }

  peekUp() {
    const location = { row: this.#currentLocation.row - 1, col: this.#currentLocation.col };
    return { location, value: this.at(location) };
  }

  peekDown() {
    const location = { row: this.#currentLocation.row + 1, col: this.#currentLocation.col };
    return { location, value: this.at(location) };
  }

  peekLeft() {
    const location = { row: this.#currentLocation.row, col: this.#currentLocation.col - 1 };
    return { location, value: this.at(location) };
  }

  peekRight() {
    const location = { row: this.#currentLocation.row, col: this.#currentLocation.col + 1 };
    return { location, value: this.at(location) };
  }

  insertRow({ index, value }) {
    // insert a copy of the value array otherwise its inserting a reference
    this.#grid.splice(index, 0, [...value]);
    this.#numRows = this.#grid.length;
    this.#resetRaw();
  }

  insertCol({ index, value }) {
    for (let row = 0; row < this.#numRows; row += 1) {
      this.#grid[row].splice(index, 0, value[row]);
    }
    this.#numCols = this.#grid[0].length;
    this.#resetRaw();
  }
}
