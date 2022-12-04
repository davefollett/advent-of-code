// https://adventofcode.com/2022/day/4

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import fileParser from '../utils/file-parser.js';

function lineParserP1(line) {
  const [e1s, e1e, e2s, e2e] = line.split(/[-,]+/);

  const elf1Start = parseInt(e1s, 10);
  const elf1End = parseInt(e1e, 10);
  const elf2Start = parseInt(e2s, 10);
  const elf2End = parseInt(e2e, 10);

  if ((elf1Start >= elf2Start && elf1End <= elf2End)
  || (elf2Start >= elf1Start && elf2End <= elf1End)) {
    return 1;
  }

  return 0;
}

export function part1(filename) {
  const completeOverlaps = fileParser(filename, lineParserP1);
  return completeOverlaps.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

function lineParserP2(line) {
  const [e1s, e1e, e2s, e2e] = line.split(/[-,]+/);

  const elf1Start = parseInt(e1s, 10);
  const elf1End = parseInt(e1e, 10);
  const elf2Start = parseInt(e2s, 10);
  const elf2End = parseInt(e2e, 10);

  if ((elf1Start >= elf2Start && elf1Start <= elf2End)
  || (elf2Start >= elf1Start && elf2Start <= elf1End)
  || (elf1End >= elf2Start && elf1End <= elf2End)
  || (elf2End >= elf1Start && elf2End <= elf1End)) {
    return 1;
  }

  return 0;
}

export function part2(filename) {
  const anyOverlaps = fileParser(filename, lineParserP2);
  return anyOverlaps.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

export function run() {
  const filename = './day-04/input.txt';
  const results = new Result('Day 04');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
