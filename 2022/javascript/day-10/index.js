// https://adventofcode.com/2022/day/10

import fs from 'fs';
import os from 'os';
import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';

function initCycles(filename) {
  const cycles = [];
  let x = 1;

  fs.readFileSync(filename, 'utf-8')
    .split(os.EOL)
    .forEach((signal) => {
      if (signal === 'noop') {
        cycles.push(x);
      } else {
        cycles.push(x);
        cycles.push(x);
        const [, valueStr] = signal.split(' ');
        const value = parseInt(valueStr, 10);
        x += value;
      }
    });

  return cycles;
}

export function part1(filename) {
  const cycles = initCycles(filename);

  let result = 0;
  for (let i = 19; i < cycles.length; i += 40) {
    // console.log(`cycle=${i+1} value=${cycles[i]} strength=${(i + 1) * cycles[i]}`)
    result += (i + 1) * cycles[i];
  }

  return result;
}

export function part2(filename) {
  const cycles = initCycles(filename);
  let spritePosition = 1;
  const row = [];

  for (let i = 0; i < cycles.length; i += 1) {
    spritePosition = cycles[i];
    const iOffset = i % 40;
    if (iOffset === 0) {
      row.push('\n');
    }
    if (iOffset === spritePosition - 1
      || iOffset === spritePosition
      || iOffset === spritePosition + 1) {
      row.push('#');
    } else {
      row.push('.');
    }
  }

  // console.log(row.join(''));

  return row.join('');
}

export function run() {
  const filename = './day-10/input.txt';
  const results = new Result('Day 10');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
