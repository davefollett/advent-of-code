// https://adventofcode.com/2022/day/5

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import fileParser from '../utils/file-parser.js';

function lineParserP1(line) {
  return line.length;
}

export function part1(filename) {
  const data = fileParser(filename, lineParserP1);
  return data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

function lineParserP2(line) {
  return line.length;
}

export function part2(filename) {
  const data = fileParser(filename, lineParserP2);
  return data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

export function run() {
  const filename = './day-05/input.txt';
  const results = new Result('Day 05');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
