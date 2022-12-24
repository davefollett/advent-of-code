// https://adventofcode.com/2022/day/11

import fs from 'fs';
import os from 'os';
import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';

function chunkToMonkey(chunk) {

  const items = chunk[1]
    .split(':')[1]
    .split(',')
    .map((item) => {
      return parseInt(item.trim(), 10);
    });

  const monkey = {
    items,
    formula: {
      left: chunk[2].split('= ')[1].split(' ')[0],
      operation: chunk[2].split('= ')[1].split(' ')[1],
      right: chunk[2].split('= ')[1].split(' ')[2]
    },
    test: {
      divisibleBy: parseInt(chunk[3].split(' ')[5], 10),
      ifTrue: parseInt(chunk[4].split(' ')[9], 10),
      ifFalse: parseInt(chunk[5].split(' ')[9], 10),
    }
  }

  return monkey;
}

function chunkArray(arr, chunkSize, chunkParser) {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    result.push(chunkParser(chunk));
  }
  return result;
}

function initMonkeys(filename) {
  const LINES_PER_MONKEY = 7;
  const monkeys = chunkArray(fs.readFileSync(filename, 'utf-8').split(os.EOL), LINES_PER_MONKEY, chunkToMonkey);

  // console.log(monkeys)
  return monkeys;
}

function compute(formula, old, reduceWorry = true) {
  let result = 0;
  const left = (formula.left === 'old') ? old : parseInt(formula.left, 10);
  const right = (formula.right === 'old') ? old : parseInt(formula.right, 10);

  switch (formula.operation) {
    case '+':
      result = (reduceWorry) ? left + right : BigInt(left) + BigInt(right);
      break;
    case '*':
      result = (reduceWorry) ? left * right : BigInt(left) * BigInt(right);
      break;
  }

  if (reduceWorry) {
    return Math.floor(result / 3);
  }

  return result;
}

function sendToWhichMonkey(test, item, reduceWorry = true) {
  if (reduceWorry) {
    return (item % test.divisibleBy) === 0 ? test.ifTrue : test.ifFalse;
  }
  return (item % BigInt(test.divisibleBy)) === 0 ? test.ifTrue : test.ifFalse;
}

export function part1(filename) {
  const monkeys = initMonkeys(filename);
  const inspections = new Array(monkeys.length).fill(0);

  for (let round = 0; round < 20; round += 1) {
    for (let monkey = 0; monkey < monkeys.length; monkey += 1) {
      monkeys[monkey].items = monkeys[monkey].items.filter((item) => {
        inspections[monkey] += 1;
        const newItem = compute(monkeys[monkey].formula, item);
        const newMonkey = sendToWhichMonkey(monkeys[monkey].test, newItem);
        // console.log(newMonkey)
        monkeys[newMonkey].items.push(newItem);
        return false;
      });
    }
  }

  // console.log(monkeys)
  // console.log(inspections)
  inspections.sort((a, b) => b - a);
  return inspections[0] * inspections[1];
}

export function part2(filename) {
  const monkeys = initMonkeys(filename);
  const inspections = new Array(monkeys.length).fill(0);

  for (let round = 0; round < 1; round += 1) {
    for (let monkey = 0; monkey < monkeys.length; monkey += 1) {
      monkeys[monkey].items = monkeys[monkey].items.filter((item) => {
        inspections[monkey] += 1;
        const newItem = compute(monkeys[monkey].formula, item, false);
        const newMonkey = sendToWhichMonkey(monkeys[monkey].test, newItem, false);
        // console.log(newMonkey)
        monkeys[newMonkey].items.push(newItem);
        return false;
      });
    }
  }

  // console.log(monkeys)
  console.log(inspections)
  inspections.sort((a, b) => b - a);
  return inspections[0] * inspections[1];
}

export function run() {
  const filename = './day-11/input.txt';
  const results = new Result('Day 11');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
