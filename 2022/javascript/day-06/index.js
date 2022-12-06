// https://adventofcode.com/2022/day/5

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import fileParser from '../utils/file-parser.js';
import fs from 'fs';


export function fourUnique(one, two, three, four) {
  let result = false;

  if (one !== two
    && one !== three
    && one !== four
    && two !== three
    && two !== four
    && three !== four) {
      result = true;
  }

  return result;
}

export function part1(filename) {
  const signal = fs.readFileSync(filename, 'utf-8')
  let startMakerLocation = 0;

  for (let start = 0; start + 3 < signal.length; start += 1) {
    if (fourUnique(signal[start], signal[start+1], signal[start+2], signal[start+3])) {
      startMakerLocation = start + 3 + 1;
      break;
    }
  }
  
  return startMakerLocation;
}

export function isUnique(value) {
  const valueSet = new Set(value);
  return valueSet.size === value.length;
}

export function part2(filename) {
  const signal = fs.readFileSync(filename, 'utf-8')
  let startMakerLocation = 0;

  for (let start = 0; start + 13 < signal.length; start += 1) {
    if (isUnique(signal.slice(start, start+13+1))) {
      startMakerLocation = start + 13 + 1;
      break;
    }
  }
  
  return startMakerLocation;
}

export function run() {
  const filename = './day-06/input.txt';
  const results = new Result('Day 06');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
