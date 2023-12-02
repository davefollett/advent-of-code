// https://adventofcode.com/2023/day/1

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import fileParser from '../utils/file-parser.js';
import { sumNumbers } from '../utils/array.js';

function lineParserP1(line) {
  const numbers = line.replaceAll(/[a-zA-z]/gi, '');
  return parseInt(`${numbers.at(0)}${numbers.at(-1)}`, 10);
}

function toDigit(number) {
  const mapping = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    eno: '1',
    owt: '2',
    eerht: '3',
    ruof: '4',
    evif: '5',
    xis: '6',
    neves: '7',
    thgie: '8',
    enin: '9',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
  };
  return mapping[number];
}

function lineParserP2(line) {
  let firstNumber = line.match(/one|two|three|four|five|six|seven|eight|nine|1|2|3|4|5|6|7|8|9/gi)[0];
  firstNumber = toDigit(firstNumber);

  const reversedLine = line.split('').reverse().join('');
  let lastNumber = reversedLine.match(/eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|1|2|3|4|5|6|7|8|9/gi)[0];
  lastNumber = toDigit(lastNumber);

  return parseInt(`${firstNumber}${lastNumber}`, 10);
}

export function part1(filename) {
  const lines = fileParser(filename, lineParserP1);
  return sumNumbers(lines);
}

export function part2(filename) {
  const lines = fileParser(filename, lineParserP2);
  return sumNumbers(lines);
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
