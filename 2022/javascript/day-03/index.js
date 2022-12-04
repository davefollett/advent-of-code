// https://adventofcode.com/2022/day/3

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import fileParser from '../utils/file-parser.js';

function toPriority(item) {
  const asciiCode = item.charCodeAt(0);

  if (asciiCode >= 97 && asciiCode <= 122) {
    return asciiCode - 96;
  }
  return asciiCode - 38;
}

function lineParserP1(line) {
  const partOne = [...new Set(line.slice(0, line.length / 2))].sort();
  const partTwo = [...new Set(line.slice(line.length / 2, line.length))].sort();

  for (const item of partOne) {
    if (partTwo.includes(item)) {
      return toPriority(item);
    }
  }

  return 0;
}

export function part1(filename) {
  const items = fileParser(filename, lineParserP1);
  return items.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

function lineParserP2(line) {
  return [...new Set(line)].sort();
}

function groupSacks(sacks, groupSize = 3) {
  const result = [];
  for (let i = 0; i < sacks.length; i += groupSize) {
    const group = sacks.slice(i, i + groupSize);
    result.push(group);
  }
  return result;
}

export function part2(filename) {
  const sacks = fileParser(filename, lineParserP2);
  const groups = groupSacks(sacks);
  const items = [];

  for (const group of groups) {
    const sack1 = group[0];
    const sack2 = group[1];
    const sack3 = group[2];
    for (const item of sack1) {
      if (sack2.includes(item) && sack3.includes(item)) {
        items.push(toPriority(item));
        break;
      }
    }
  }

  return items.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

export function run() {
  const filename = './day-03/input.txt';
  const results = new Result('Day 03');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
