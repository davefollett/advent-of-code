// https://adventofcode.com/2023/day/4

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import fileParser from '../utils/file-parser.js';
import { sumNumbers } from '../utils/array.js';

function lineParserP1(line) {
  let numWinners = 0;
  const winningNumbers = line.split(': ')[1].split(' | ')[0].split(' ').filter((number) => number.length);
  const elfNumbers = line.split(': ')[1].split(' | ')[1].split(' ').filter((number) => number.length);

  winningNumbers.forEach((number) => {
    if (elfNumbers.includes(number)) {
      numWinners += 1;
    }
  })

  let result = 0;
  if (numWinners) {
    result = 1;
    if (numWinners > 1) {
      for (let i = 0; i<numWinners-1; i += 1 ) {
        result *= 2;
      }
    }
  }
  
  // console.log(numWinners)
  // const result = Math.pow(2, numWinners - 1) + 1;
  // console.log(result)
  // console.log(winningNumbers)
  // console.log(elfNumbers)
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
  })

  return {
    cardNumber,
    winningNumbers,
    elfNumbers,
    numWinners,
    instances: 1,
  }
}

export function part2(filename) {
  const cardArray = fileParser(filename, lineParserP2);
  const cards = {};

  cardArray.forEach((card) => {
    cards[card.cardNumber] = {
      winningNumbers: card.winningNumbers,
      elfNumbers: card.elfNumbers,
      numWinners: card.numWinners,
      instances: card.instances,
    }
  })

// console.log(cards)

  for (const num in cards) {
    // console.log(cards[num])
    // console.log(`processing card ${num}, ${cards[num].instances} times.`)
    for (let i = 0; i < cards[num].instances; i += 1) {
      // console.log(`processing card ${num} instance number ${i}`)
      for (let w = 1; w <= cards[num].numWinners; w += 1 ) {
        const index = (parseInt(num, 10) + w).toString();
        cards[index].instances += 1;
        // console.log(index)
      }
    }
  }

  let result = 0;
  for (const num in cards) {
    result += cards[num].instances;
  }

  // for (let card = 0;)
  // console.log(cards)
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
