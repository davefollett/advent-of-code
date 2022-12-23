// https://adventofcode.com/2022/day/11

import fs from 'fs';
import os from 'os';
import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';


export function part1(filename) {
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
