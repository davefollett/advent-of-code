// https://adventofcode.com/2022/day/7

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import fileParser from '../utils/file-parser.js';
import fs from 'fs';

export function part1(filename) {
  const signal = fs.readFileSync(filename, 'utf-8')
  
  return 0;
}

export function part2(filename) {
  const signal = fs.readFileSync(filename, 'utf-8')
  
  return 0;
}

export function run() {
  const filename = './day-07/input.txt';
  const results = new Result('Day 07');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
