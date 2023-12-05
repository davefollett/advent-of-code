// https://adventofcode.com/2023/day/4

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import fileParser, { fileParserToObject } from '../utils/file-parser.js';
import { sumNumbers } from '../utils/array.js';

function lineParserP1(line) {
  let numWinners = 0;
  const winningNumbers = line.split(': ')[1].split(' | ')[0].split(' ').filter((number) => number.length);
  const elfNumbers = line.split(': ')[1].split(' | ')[1].split(' ').filter((number) => number.length);

  winningNumbers.forEach((number) => {
    if (elfNumbers.includes(number)) {
      numWinners += 1;
    }
  });

  const result = (numWinners) ? 2 ** (numWinners - 1) : 0;

  return result;
}

export function part1(filename) {
  const lines = fileParser(filename, lineParserP1);
  return sumNumbers(lines);
}

function lineParserP2(line) {
  const cardNumber = line.split(': ')[0].split(' ').filter((number) => number.length)[1];
  const winningNumbers = line.split(': ')[1].split(' | ')[0].split(' ').filter((number) => number.length);
  const elfNumbers = line.split(': ')[1].split(' | ')[1].split(' ').filter((number) => number.length);

  let numWinners = 0;
  winningNumbers.forEach((number) => {
    if (elfNumbers.includes(number)) {
      numWinners += 1;
    }
  });

  return {
    key: cardNumber,
    value: {
      winningNumbers,
      elfNumbers,
      numWinners,
      instances: 1,
    },
  };
}

export function part2(filename) {
  const cards = fileParserToObject(filename, lineParserP2);

  Object.keys(cards).forEach((num) => {
    const multiplier = cards[num].instances;
    for (let w = 1; w <= cards[num].numWinners; w += 1) {
      const index = (parseInt(num, 10) + w).toString();
      cards[index].instances += 1 * multiplier;
    }
  });

  const result = Object.values(cards).reduce((sum, card) => sum + card.instances, 0);

  return result;
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
