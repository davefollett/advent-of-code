// https://adventofcode.com/2023/day/14

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import Grid from '../utils/grid.js';

export function part1(filename) {
  const grid = new Grid({ gridFilename: filename });

  return 0;
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
