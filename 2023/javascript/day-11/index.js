// https://adventofcode.com/2023/day/11

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import Grid from '../utils/grid.js';

const EMPTY = '.';
const GALAXY = '#';

export function part1(filename) {
  const grid = new Grid({ gridFilename: filename });

  const emptyRow = Array(grid.numCols).fill(EMPTY);
  const emptyRowIndexes = grid.findAllRows(emptyRow);
  emptyRowIndexes.forEach((rowIndex, index) => {
    grid.insertRow({ index: rowIndex + index, value: emptyRow });
  });

  const emptyCol = Array(grid.numRows).fill(EMPTY);
  const emptyColIndexes = grid.findAllCols(emptyCol);
  emptyColIndexes.forEach((colIndex, index) => {
    grid.insertCol({ index: colIndex + index, value: emptyCol });
  });

  const allGalaxies = grid.findAll(GALAXY);

  let sumOfShortestPaths = 0;
  for (let i = 0; i < allGalaxies.length; i += 1) {
    for (let j = i + 1; j < allGalaxies.length; j += 1) {
      sumOfShortestPaths += Grid.distanceBetween(allGalaxies[i], allGalaxies[j]);
    }
  }

  return sumOfShortestPaths;
}

export function part2(filename) {
  return 0;
}

export function run() {
  const filename = './day-11/input.txt';
  const results = new Result('Day 11');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
