// https://adventofcode.com/2023/day/1

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import fileParser from '../utils/file-parser.js';
import { sumNumbers } from '../utils/array.js';

function lineParserP1(line) {
  return line;
}

function lineParserP2(line) {
  return line;
}

export function part1(filename) {
  const lines = fileParser(filename, lineParserP1);
  return 0;
}

export function part2(filename) {
  const lines = fileParser(filename, lineParserP2);
  return 0;
}

export function run() {
  const filename = './day-02/input.txt';
  const results = new Result('Day 02');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
