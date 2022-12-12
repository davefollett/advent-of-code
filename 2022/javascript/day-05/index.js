// https://adventofcode.com/2022/day/5

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import fileParser from '../utils/file-parser.js';

function lineParserP1(line) {
  return line;
}

function separate(data) {
  let separatorFound = false;
  const stacks = [];
  const moves = [];

  const numStacks = (data[0].length + 1) / 4;

  for (let i = 0; i < numStacks; i += 1) {
    stacks.push([]);
  }

  data.forEach((line) => {
    if (line.length === 0) {
      separatorFound = true;
      return;
    }

    if (separatorFound) {
      moves.push(line);
    } else {
      if (line.includes('1')) { return; }

      for (let k = 1, i = 0; k <= line.length; k += 4, i += 1) {
        if (line[k] !== ' ') {
          stacks[i].push(line[k]);
        }
      }
    }
  });

  stacks.forEach((stack) => stack.reverse());

  return { stacks, numStacks, moves };
}

export function part1(filename) {
  const data = fileParser(filename, lineParserP1);
  const { stacks, numStacks, moves } = separate(data);

  moves.forEach((move) => {
    const [, amountStr,, srcStackStr,, destStackStr] = move.split(' ');
    const amount = parseInt(amountStr, 10);
    const srcStack = parseInt(srcStackStr, 10);
    const destStack = parseInt(destStackStr, 10);

    for (let i = 0; i < amount; i += 1) {
      const crate = stacks[srcStack - 1].pop();
      stacks[destStack - 1].push(crate);
    }
  });

  let result = '';
  for (let i = 0; i < numStacks; i += 1) {
    result += stacks[i].pop();
  }

  return result;
}

function lineParserP2(line) {
  return line;
}

export function part2(filename) {
  const data = fileParser(filename, lineParserP2);
  const { stacks, numStacks, moves } = separate(data);

  moves.forEach((move) => {
    const [, amountStr,, srcStackStr,, destStackStr] = move.split(' ');
    const amount = parseInt(amountStr, 10);
    const srcStack = parseInt(srcStackStr, 10);
    const destStack = parseInt(destStackStr, 10);

    const crates = stacks[srcStack - 1].splice(stacks[srcStack - 1].length - amount, amount);
    stacks[destStack - 1] = stacks[destStack - 1].concat(crates);
  });

  let result = '';
  for (let i = 0; i < numStacks; i += 1) {
    result += stacks[i].pop();
  }

  return result;
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
