// https://adventofcode.com/2023/day/8

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import fileParser from '../utils/file-parser.js';

export function part1(filename) {
  const lines = fileParser(filename);
  const moves = lines[0].split('');
  const network = {};
  lines.slice(2).forEach((line) => {
    const node = line.split(' ')[0];
    const L = line.split(' ')[2].replace('(', '').replace(',', '');
    const R = line.split(' ')[3].replace(')', '');
    network[node] = { L, R };
  });

  let numberOfSteps = 0;
  let currentStep = 0;
  
  const end = 'ZZZ';
  let currentNode = 'AAA';

  while (currentStep < moves.length) {
    numberOfSteps += 1;
    currentNode = network[currentNode][moves[currentStep]];

    if (currentNode === end) {
      break;
    }

    if (currentStep + 1 === moves.length) {
      currentStep = 0;
    } else {
      currentStep += 1;
    }
  }
  return numberOfSteps;
}

function lineParserP2(line) {
  return line;
}

export function part2(filename) {
  const lines = fileParser(filename, lineParserP2);
  return 0;
}

export function run() {
  const filename = './day-08/input.txt';
  const results = new Result('Day 08');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
