// https://adventofcode.com/2023/day/6

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import { fileParserToObject } from '../utils/file-parser.js';

function computeDistance(time, hold) {
  return hold * (time - hold);
}

function findRecordDistances(time, distanceRecord) {
  const records = [];
  for (let i = 0; i <= time; i += 1) {
    const distance = computeDistance(time, i);
    if (distance > distanceRecord) {
      records.push(distance);
    }
  }
  return records;
}

function lineParserP1(line) {
  const key = line.split(':')[0].toLowerCase();
  const value = line
    .split(':')[1]
    .split(' ')
    .filter((num) => num.length > 0)
    .map((num) => parseInt(num, 10));

  return { key, value };
}

export function part1(filename) {
  let result = 1;
  const game = fileParserToObject(filename, lineParserP1);

  game.time.forEach((time, index) => {
    result *= findRecordDistances(time, game.distance[index]).length;
  });

  return result;
}

function findNumberOfRecordDistances(time, distanceRecord) {
  let minRecordTime = 0;
  for (let i = 0; i <= time; i += 1) {
    const distance = computeDistance(time, i);
    if (distance > distanceRecord) {
      minRecordTime = i;
      break;
    }
  }

  let maxRecordTime = 0;
  for (let i = time; i >= 0; i -= 1) {
    const distance = computeDistance(time, i);
    if (distance > distanceRecord) {
      maxRecordTime = i;
      break;
    }
  }
  return maxRecordTime - minRecordTime + 1;
}

function lineParserP2(line) {
  const key = line.split(':')[0].toLowerCase();
  const value = parseInt(line
    .split(':')[1]
    .split(' ')
    .filter((num) => num.length > 0)
    .join(''), 10);

  return { key, value };
}

export function part2(filename) {
  const game = fileParserToObject(filename, lineParserP2);

  return findNumberOfRecordDistances(game.time, game.distance);
}

export function run() {
  const filename = './day-06/input.txt';
  const results = new Result('Day 06');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
