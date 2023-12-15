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

  find(value) {
    for (let row = 0; row < this.#grid.length; row += 1) {
      for (let col = 0; col < this.#grid[row].length; col += 1) {
        if (this.#grid[row][col] === value) {
          return { row, col };
        }
      }
    }
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
    const location = { row: this.#currentLocation.row + 1, col: this.#currentLocation.col }
    return { location, value: this.at(location) };
  }

  peekLeft() {
    const location = { row: this.#currentLocation.row, col: this.#currentLocation.col - 1 }
    return { location, value: this.at(location) };
  }

  peekRight() {
    const location = { row: this.#currentLocation.row, col: this.#currentLocation.col + 1 }
    return { location, value: this.at(location) };
  }
}
