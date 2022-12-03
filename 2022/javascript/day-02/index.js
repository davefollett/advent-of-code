// https://adventofcode.com/2022/day/2

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import fileParser from '../utils/file-parser.js';

const WIN = 6;
const DRAW = 3;
const LOSE = 0;

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';

const THEM_LOOKUP = { A: ROCK, B: PAPER, C: SCISSORS };
const ME_LOOKUP = { X: ROCK, Y: PAPER, Z: SCISSORS };
const ME_TO_OUTCOME_LOOKUP = { X: 'LOSE', Y: 'DRAW', Z: 'WIN' };

function scoreRound(them, me) {
  const ME_CARD_POINTS_LOOKUP = { ROCK: 1, PAPER: 2, SCISSORS: 3 };

  const RESULT_LOOKUP = {
    ROCK: { ROCK: DRAW, PAPER: WIN, SCISSORS: LOSE },
    PAPER: { ROCK: LOSE, PAPER: DRAW, SCISSORS: WIN },
    SCISSORS: { ROCK: WIN, PAPER: LOSE, SCISSORS: DRAW },
  };

  return RESULT_LOOKUP[them][me] + ME_CARD_POINTS_LOOKUP[me];
}

function lineParserP1(line) {
  const round = line.split(' ');
  const them = THEM_LOOKUP[round[0]];
  const me = ME_LOOKUP[round[1]];

  return scoreRound(them, me);
}

export function part1(filename) {
  const scoreLog = fileParser(filename, lineParserP1);
  return scoreLog.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

function determineMe(them, outcome) {
  const RESULT_LOOKUP = {
    ROCK: { DRAW: ROCK, WIN: PAPER, LOSE: SCISSORS },
    PAPER: { LOSE: ROCK, DRAW: PAPER, WIN: SCISSORS },
    SCISSORS: { WIN: ROCK, LOSE: PAPER, DRAW: SCISSORS },
  };

  return RESULT_LOOKUP[them][outcome];
}

function lineParserP2(line) {
  const round = line.split(' ');
  const them = THEM_LOOKUP[round[0]];
  const outcome = ME_TO_OUTCOME_LOOKUP[round[1]];
  const me = determineMe(them, outcome);

  return scoreRound(them, me);
}

export function part2(filename) {
  const scoreLog = fileParser(filename, lineParserP2);
  return scoreLog.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

export function run() {
  const filename = './day-02/input.txt';
  const results = new Result('Day 02');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
