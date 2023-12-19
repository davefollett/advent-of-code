// https://adventofcode.com/2023/day/11

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import Grid from '../utils/grid.js';

const EMPTY = '.';
const GALAXY = '#';

export function part1(filename) {
  const grid = new Grid({ gridFilename: filename });
  let emptyRow = Array(grid.numCols).fill(EMPTY);
  let emptyCol = Array(grid.numRows).fill(EMPTY);

  console.log(`numRows=${grid.numRows} numCols=${grid.numCols}`);

  console.log(emptyRow.join('') + '\n');
  const emptyRowIndexes = grid.findAllRows(emptyRow);
  const emptyColIndexes = grid.findAllCols(emptyCol);

  console.log(grid.raw)
  console.log('\n')
  emptyRowIndexes.forEach((rowIndex, index) => {
    grid.insertRow({ index: rowIndex + index, value: emptyRow});
  });

  console.log(`numRows=${grid.numRows} numCols=${grid.numCols}`);

  console.log(grid.raw)
  console.log('\n')

  emptyCol = Array(grid.numRows).fill(EMPTY);
  console.log(emptyCol.join('') + '\n');
  // console.log(emptyCol.length);

  emptyColIndexes.forEach((colIndex, index) => {
    grid.insertCol({ index: colIndex + index, value: emptyCol})
  });

  console.log(`numRows=${grid.numRows} numCols=${grid.numCols}`);
  console.log(grid.raw)
  console.log('\n')

  // console.log(grid.at({ row: 3, col: 12}))
  // console.log('emptyRowIndexes=', emptyRowIndexes);
  // console.log('emptyColIndexes=', emptyColIndexes);
  // console.log(grid.numRows, grid.numCols);

  return 0;
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
