// https://adventofcode.com/2023/day/14

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import Grid from '../utils/grid.js';

// function processGrid(grid) {
//   let didGridChange = false;
//   for (let row = 0; row < grid.numRows; row += 1) {
//     for (let col = 0; col < grid.numCols; col += 1) {
//       grid.moveTo({row, col});
//       if (grid.at() === 'O' && grid.peekUp() === '.') {
//         grid.changeAt({ row: row + 1, col});
//         didGridChange = true;
//       }
//     }
//   }
//   return didGridChange;
// }

export function part1(filename) {
  const grid = new Grid({ gridFilename: filename });
  let didGridChange = false;
  // console.log(grid.raw + '\n');
  do {
    didGridChange = false;
    for (let row = 0; row < grid.numRows; row += 1) {
      for (let col = 0; col < grid.numCols; col += 1) {
    // for (let row = 0; row < 5; row += 1) {
    //   for (let col = 0; col < grid.numCols; col += 1) {
        const currentValue = grid.moveTo({row, col});
        const { location: upLocation, value: upValue } = grid.peekUp();
        // console.log(`at=${currentValue} up=${upValue}`)
        // console.log('current location', grid.currentLocation, currentValue)
        // console.log('up location', upLocation, upValue)
        if (currentValue === 'O' && upValue === '.') {
          grid.changeAt(upLocation, 'O');
          grid.changeAt({row, col}, '.');
          didGridChange = true;
          // console.log('grid changed')
        }
      }
      // console.log('\n')
    }
    // console.log(grid.raw + '\n');
  } while (didGridChange);

  // console.log(grid.raw + '\n');

  let result = 0;
  for (let row = 0; row < grid.numRows; row += 1) {
    for (let col = 0; col < grid.numCols; col += 1) {
      const currentValue = grid.moveTo({row, col});
      if (currentValue === 'O') {
        result += grid.numRows - grid.currentLocation.row;
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
