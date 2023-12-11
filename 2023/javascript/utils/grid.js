import os from 'os';

export default class Grid {
  #grid;

  #numRows;

  #numCols;

  #currentLocation;

  constructor(gridString) {
    this.#grid = gridString
      .split(os.EOL)
      .map((line) => line.split(''));

    this.#numRows = this.#grid.length;
    this.#numCols = this.#grid[0].length;
    this.#currentLocation = { row: 0, col: 0 };
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

  at({ row = this.#currentLocation.row, col = this.#currentLocation.col } = {}) {
    return this.#grid[row][col];
  }

  moveTo({ row, col }) {
    this.#currentLocation = { row, col };
    return this.at({ row, col });
  }

  moveUp() {
    this.#currentLocation.row -= 1;
    return this.at();
  }

  moveDown() {
    this.#currentLocation.row += 1;
    return this.at();
  }

  moveLeft() {
    this.#currentLocation.col -= 1;
    return this.at();
  }

  moveRight() {
    this.#currentLocation.row += 1;
    return this.at();
  }

  peekUp() {
    return this.at({ row: this.#currentLocation.row - 1, col: this.#currentLocation.col });
  }

  peekDown() {
    return this.at({ row: this.#currentLocation.row + 1, col: this.#currentLocation.col });
  }

  peekLeft() {
    return this.at({ row: this.#currentLocation.row, col: this.#currentLocation.col - 1 });
  }

  peekRight() {
    return this.at({ row: this.#currentLocation.row, col: this.#currentLocation.col + 1 });
  }
}
