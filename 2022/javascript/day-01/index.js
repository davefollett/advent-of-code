// https://adventofcode.com/2022/day/1

// const readline = require("readline");
// import * as readline from 'node:readline';
// const fs = require("fs");
// import * as fs from 'node:fs';
// const { performance } = require("perf_hooks");
import { performance } from 'node:perf_hooks';

const results = {
  title: 'Day 01',
  part1: {
    answer: 'TBD',
    time: 0,
  },
  part2: {
    answer: 'TBD',
    time: 0,
  },
};

export function part1() {
  const result = 0;

  return result;
}

export function part2() {
  const result = 0;

  return result;
}

export function run() {
  let start = performance.now();
  results.part1.answer = part1();
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2();
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
