// https://adventofcode.com/2023/day/3

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import createGrid from '../utils/grid.js';

function isDigit(value) {
  if (!value) { return false; }
  if (!value.length) { return false; }
  if (value.length > 1) { return false; }

  let result = false;
  const asciiValue = value.charCodeAt(0);
  if (asciiValue >= 48 && asciiValue <= 57) {
    result = true;
  }
  return result;
}

function isDot(value) {
  return value === '.';
}

function computeNumber(digits) {
  return parseInt(digits.join(''), 10);
}

function isAdjacent(symbols, digitLocations) {
  let result = false;
  digitLocations.forEach((location) => {
    const row = parseInt(location.split('-')[0], 10);
    const col = parseInt(location.split('-')[1], 10);

    result ||= symbols.has(`${row}-${col + 1}`);
    result ||= symbols.has(`${row}-${col - 1}`);
    result ||= symbols.has(`${row - 1}-${col - 1}`);
    result ||= symbols.has(`${row - 1}-${col}`);
    result ||= symbols.has(`${row - 1}-${col + 1}`);
    result ||= symbols.has(`${row + 1}-${col - 1}`);
    result ||= symbols.has(`${row + 1}-${col}`);
    result ||= symbols.has(`${row + 1}-${col + 1}`);
  });
  return result;
}

export function part1(filename) {
  let result = 0;

  const grid = createGrid(filename);

  const numbers = [];
  const symbols = new Set();

  for (let row = 0; row < grid.length; row += 1) {
    let current = null;

    for (let col = 0; col < grid[row].length; col += 1) {
      const value = grid[row][col];
      const location = `${row}-${col}`;

      if (isDigit(value)) {
        if (current === null) {
          current = {
            digits: [],
            digitLocations: [],
            isPartNumber: false,
            number: 0,
          };
        }
        current.digits.push(value);
        current.digitLocations.push(location);
      } else if (isDot(value)) {
        if (current !== null) {
          current.number = computeNumber(current.digits);
          numbers.push(current);
          current = null;
        }
      } else {
        symbols.add(location);
        if (current !== null) {
          current.number = computeNumber(current.digits);
          numbers.push(current);
          current = null;
        }
      }
    }
    if (current !== null) {
      current.number = computeNumber(current.digits);
      numbers.push(current);
    }
  }

  numbers.forEach((number) => {
    /* eslint-disable-next-line no-param-reassign */
    number.isPartNumber = isAdjacent(symbols, number.digitLocations);
    if (number.isPartNumber) { result += number.number; }
  });

  return result;
}

function isGearSymbol(value) {
  return value === '*';
}

export function part2(filename) {
  let result = 0;

  const grid = createGrid(filename);

  const numbers = [];
  const symbols = [];

  for (let row = 0; row < grid.length; row += 1) {
    let current = null;

    for (let col = 0; col < grid[row].length; col += 1) {
      const value = grid[row][col];
      const location = `${row}-${col}`;

      if (isDigit(value)) {
        if (current === null) {
          current = {
            digits: [],
            digitLocations: [],
            isPartNumber: false,
            number: 0,
          };
        }
        current.digits.push(value);
        current.digitLocations.push(location);
      } else if (isDot(value)) {
        if (current !== null) {
          current.number = computeNumber(current.digits);
          numbers.push(current);
          current = null;
        }
      } else {
        if (isGearSymbol(value)) {
          symbols.push(location);
        }
        if (current !== null) {
          current.number = computeNumber(current.digits);
          numbers.push(current);
          current = null;
        }
      }
    }
    if (current !== null) {
      current.number = computeNumber(current.digits);
      numbers.push(current);
    }
  }

  symbols.forEach((symbol) => {
    const numbersAdjacent = [];
    numbers.forEach((number) => {
      const row = parseInt(symbol.split('-')[0], 10);
      const col = parseInt(symbol.split('-')[1], 10);
      let isSymbolAdjacent = false;
      isSymbolAdjacent ||= number.digitLocations.includes(`${row}-${col + 1}`);
      isSymbolAdjacent ||= number.digitLocations.includes(`${row}-${col - 1}`);
      isSymbolAdjacent ||= number.digitLocations.includes(`${row - 1}-${col - 1}`);
      isSymbolAdjacent ||= number.digitLocations.includes(`${row - 1}-${col}`);
      isSymbolAdjacent ||= number.digitLocations.includes(`${row - 1}-${col + 1}`);
      isSymbolAdjacent ||= number.digitLocations.includes(`${row + 1}-${col - 1}`);
      isSymbolAdjacent ||= number.digitLocations.includes(`${row + 1}-${col}`);
      isSymbolAdjacent ||= number.digitLocations.includes(`${row + 1}-${col + 1}`);
      if (isSymbolAdjacent) {
        numbersAdjacent.push(number.number);
      }
    });
    if (numbersAdjacent.length === 2) {
      result += numbersAdjacent[0] * numbersAdjacent[1];
    }
  });

  return result;
}

export function run() {
  const filename = './day-03/input.txt';
  const results = new Result('Day 03');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
