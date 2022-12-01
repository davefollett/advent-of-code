// https://adventofcode.com/2022/day/1

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import fileParser from '../utils/file-parser.js';

const ELF_SEPARATOR = -1;

function lineParserP1(line) {
  if (line.length === 0) { return ELF_SEPARATOR; }
  return parseInt(line, 10);
}

function caloriesPerElf(filename) {
  const calorieLog = fileParser(filename, lineParserP1);
  calorieLog.push(ELF_SEPARATOR);

  const perElf = [];
  let sum = 0;

  calorieLog.forEach((entry) => {
    if (entry === ELF_SEPARATOR) {
      perElf.push(sum);
      sum = 0;
    } else {
      sum += entry;
    }
  });

  return perElf.sort((a, b) => b - a);
}

export function part1(filename) {
  return caloriesPerElf(filename)[0];
}

export function part2(filename) {
  const perElf = caloriesPerElf(filename);
  return perElf[0] + perElf[1] + perElf[2];
}

export function run() {
  const filename = './day-01/input.txt';
  const results = new Result('Day 01');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
