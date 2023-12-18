// https://adventofcode.com/2023/day/15

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import { fileParserToString } from '../utils/file-parser.js';

function hash(step) {
  let result = 0;
  for (const c of step) {
    result += c.charCodeAt(0);
    result *= 17;
    result %= 256;
  }
  return result;
}

export function part1(filename) {
  const steps = fileParserToString(filename)
    .split(',')
    .reduce((accu, step) => accu + hash(step), 0);

  return steps;
}

export function part2(filename) {
  const hashmap = {};
  const steps = fileParserToString(filename)
    .split(',')
    .map((step) => {
      const result = {};
      if (step.includes('=')) {
        /* eslint-disable-next-line prefer-destructuring */
        result.label = step.split('=')[0];
        result.hash = hash(result.label);
        result.focalLength = parseInt(step.split('=')[1], 10);
        result.operation = '=';
      } else {
        /* eslint-disable-next-line prefer-destructuring */
        result.label = step.split('-')[0];
        result.hash = hash(result.label);
        result.focalLength = 0;
        result.operation = '-';
      }
      return result;
    });

  steps.forEach((step) => {
    const box = hashmap[step.hash];
    if (step.operation === '-') {
      if (box) {
        const index = box.findIndex((lens) => lens.label === step.label);
        if (index !== -1) {
          box.splice(index, 1);
        }
      }
    } else {
      /* eslint-disable-next-line no-lonely-if */
      if (box) {
        const index = box.findIndex((lens) => lens.label === step.label);
        if (index !== -1) {
          box.splice(index, 1, step);
        } else {
          box.push(step);
        }
      } else {
        hashmap[step.hash] = new Array(step);
      }
    }
  });

  let result = 0;
  for (const [boxNumber, lenses] of Object.entries(hashmap)) {
    /* eslint-disable-next-line no-loop-func */
    lenses.forEach((lens, index) => {
      result += (parseInt(boxNumber, 10) + 1) * (index + 1) * (lens.focalLength);
    });
  }
  return result;
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
