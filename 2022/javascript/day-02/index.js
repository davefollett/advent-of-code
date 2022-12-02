// https://adventofcode.com/2022/day/2

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import fileParser from '../utils/file-parser.js';

function lineParserP1(line) {
  const WIN = 6;
  const TIE = 3;
  const LOSE = 0;

  const THEM_LOOKUP = {
    A: 'Rock',
    B: 'Paper',
    C: 'Scissors',
  };

  const YOU_LOOKUP = {
    X: 'Rock',
    Y: 'Paper',
    Z: 'Scissors',
  };

  const YOU_POINTS_LOOKUP = {
    Rock: 1,
    Paper: 2,
    Scissors: 3,
  };

  let roundResult = LOSE;
  const round = line.split(' ');
  const them = THEM_LOOKUP[round[0]];
  const you = YOU_LOOKUP[round[1]];

  if (them === you) {
    roundResult = TIE;
  } else if ((you === 'Rock' && them === 'Scissors')
    || (you === 'Paper' && them === 'Rock')
    || (you === 'Scissors' && them === 'Paper')) {
    roundResult = WIN;
  }

  return YOU_POINTS_LOOKUP[you] + roundResult;
}

export function part1(filename) {
  const scoreLog = fileParser(filename, lineParserP1);
  return scoreLog.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

function lineParserP2(line) {
  const WIN = 6;
  const TIE = 3;
  const LOSE = 0;

  const THEM_LOOKUP = {
    A: 'Rock',
    B: 'Paper',
    C: 'Scissors',
  };

  const YOU_POINTS_LOOKUP = {
    Rock: 1,
    Paper: 2,
    Scissors: 3,
  };

  let roundResult = LOSE;
  const round = line.split(' ');
  const them = THEM_LOOKUP[round[0]];
  let you = 'Dave';

  const YOU_MODIFIED_LOOKUP = {
    X: 'Lose',
    Y: 'Tie',
    Z: 'Win',
  };

  const desiredResult = YOU_MODIFIED_LOOKUP[round[1]];

  if (them === 'Rock' && desiredResult === 'Tie') { you = 'Rock'; }
  if (them === 'Rock' && desiredResult === 'Win') { you = 'Paper'; }
  if (them === 'Rock' && desiredResult === 'Lose') { you = 'Scissors'; }
  if (them === 'Paper' && desiredResult === 'Tie') { you = 'Paper'; }
  if (them === 'Paper' && desiredResult === 'Win') { you = 'Scissors'; }
  if (them === 'Paper' && desiredResult === 'Lose') { you = 'Rock'; }
  if (them === 'Scissors' && desiredResult === 'Tie') { you = 'Scissors'; }
  if (them === 'Scissors' && desiredResult === 'Win') { you = 'Rock'; }
  if (them === 'Scissors' && desiredResult === 'Lose') { you = 'Paper'; }

  if (them === you) {
    roundResult = TIE;
  } else if ((you === 'Rock' && them === 'Scissors')
    || (you === 'Paper' && them === 'Rock')
    || (you === 'Scissors' && them === 'Paper')) {
    roundResult = WIN;
  }

  return YOU_POINTS_LOOKUP[you] + roundResult;
}

export function part2(filename) {
  const scoreLog = fileParser(filename, lineParserP2);
  return scoreLog.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

export function run() {
  const filename = './day-02/input.txt';
  // const filename = './day-02/test-input.txt';
  const results = new Result('Day 02');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
