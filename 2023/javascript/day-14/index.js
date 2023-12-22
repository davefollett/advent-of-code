// https://adventofcode.com/2023/day/14

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import Grid from '../utils/grid.js';

export function part1(filename) {
  const grid = new Grid({ gridFilename: filename });
  let result = 0;

  for (let row = 0; row < grid.numRows; row += 1) {
    for (let col = 0; col < grid.numCols; col += 1) {
      grid.moveTo({row, col});
      if (grid.at() === 'O') {
        let keepRolling = true;
        do {
          const { location: upLocation, value: upValue } = grid.peekUp();
          if (upValue === '.') {
            grid.changeAt(upLocation, 'O');
            grid.changeAt(grid.currentLocation, '.');
            grid.moveUp();
          } else {
            keepRolling = false;
            if (grid.at() === 'O') {
              result += grid.numRows - grid.currentLocation.row;
            }
          }
        } while (keepRolling);
      }
    }
  }

  return result;
}

export function part2(filename) {
  const grid = new Grid({ gridFilename: filename });

  return 0;
}

export function run() {
  const filename = './day-14/input.txt';
  const results = new Result('Day 14');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
