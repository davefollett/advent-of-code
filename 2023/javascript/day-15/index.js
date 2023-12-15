// https://adventofcode.com/2023/day/15

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import { fileParserToString } from '../utils/file-parser.js';

export function part1(filename) {
  const steps = fileParserToString(filename)
    .split(',')
    .reduce((accu, step) => {
      let stepTotal = 0;
      for (const c of step) {
        stepTotal += c.charCodeAt(0);
        stepTotal *= 17;
        stepTotal = stepTotal % 256;
      }
      return accu + stepTotal;
    }, 0);

  return steps;
}

function lineParserP2(line) {
  return line;
}

export function part2(filename) {
  const lines = fileParser(filename, lineParserP2);
  return 0;
}

export function run() {
  const filename = './day-15/input.txt';
  const results = new Result('Day 15');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
