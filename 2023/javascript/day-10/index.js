// https://adventofcode.com/2023/day/10

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import Grid from '../utils/grid.js';

function determineDirection({ prevDirection, currentValue }) {
  const moveLookup = {
    'left_-': 'left',
    left_L: 'up',
    left_F: 'down',
    'right_-': 'right',
    right_J: 'up',
    right_7: 'down',
    'down_|': 'down',
    down_J: 'left',
    down_L: 'right',
    'up_|': 'up',
    up_7: 'left',
    up_F: 'right',
  };

  return moveLookup[`${prevDirection}_${currentValue}`];
}

function determineFirstDirection({
  upValue, downValue, leftValue, rightValue,
}) {
  const validMoveUpValues = ['|', 'F', '7'];
  const validMoveDownValues = ['|', 'L', 'J'];
  const validMoveLeftValues = ['-', 'F', 'L'];
  const validMoveRightValues = ['-', 'J', '7'];

  if (validMoveUpValues.includes(upValue)) { return 'up'; }
  if (validMoveDownValues.includes(downValue)) { return 'down'; }
  if (validMoveLeftValues.includes(leftValue)) { return 'left'; }
  if (validMoveRightValues.includes(rightValue)) { return 'right'; }
  return 'error';
}

export function part1(filename) {
  const grid = new Grid({ gridFilename: filename });
  const currentLocation = grid.find('S');
  let currentValue = grid.moveTo(currentLocation);

  const directionToNextMove = {
    up: grid.moveUp.bind(grid),
    down: grid.moveDown.bind(grid),
    left: grid.moveLeft.bind(grid),
    right: grid.moveRight.bind(grid),
  };

  let steps = 1;

  let nextDirection = determineFirstDirection({
    upValue: grid.peekUp().value,
    downValue: grid.peekDown().value,
    leftValue: grid.peekLeft().value,
    rightValue: grid.peekRight().value,
  });

  let prevDirection = nextDirection;
  currentValue = directionToNextMove[nextDirection]();

  do {
    nextDirection = determineDirection({ prevDirection, currentValue });
    currentValue = directionToNextMove[nextDirection]();
    prevDirection = nextDirection;
    steps += 1;
  } while (currentValue !== 'S');

  return steps / 2;
}

export function part2(filename) {
  const grid = new Grid({ gridFilename: filename });
  const currentLocation = grid.find('S');
  const currentValue = grid.moveTo(currentLocation);
  return currentValue;
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
