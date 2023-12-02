// https://adventofcode.com/2023/day/2

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import fileParser from '../utils/file-parser.js';
import { sumNumbers } from '../utils/array.js';

const limits = {
  red: 12,
  green: 13,
  blue: 14
}

function debugCubeTotals(totals) {
  console.log(`red: ${totals['red']} green: ${totals['green']} blue: ${totals['blue']}`)
}

function lineParserP1(line) {
  let validPulls = 0;
  const gameNumber = parseInt(line.split(' ')[1].split(':')[0], 10);
  const pulls = line.split(':')[1].split(';').map((game) => game.trim())
  for (const pull of pulls) {
    const cubeTotals = {
      red: 0,
      green: 0,
      blue: 0,
    }
    // console.log('pull', pull)
    const cubes = pull.split(',');
    for (const cube of cubes) {
      const cubeTrimmed = cube.trim()
      // console.log('cube', cube)
      const number = parseInt(cubeTrimmed.split(' ')[0].trim(), 10);
      const color = cubeTrimmed.split(' ')[1].trim();
      cubeTotals[color] += number;
      // console.log(number, color)
    }
    // debugCubeTotals(cubeTotals)
    // debugCubeTotals(limits)
    if (cubeTotals['red'] <= limits['red']
    && cubeTotals['green'] <= limits['green']
    && cubeTotals['blue'] <= limits['blue']) {
      // console.log('HERERERERERE')
      validPulls += 1;
    }
  }
  // console.log(pulls)
  // console.log(validPulls)
  return (validPulls === pulls.length) ? gameNumber : 0;
}


export function part1(filename) {
  const lines = fileParser(filename, lineParserP1);
  return sumNumbers(lines);
}

function lineParserP2(line) {
  // let validPulls = 0;
  const smallestLimit = {
    red: 0,
    green: 0,
    blue: 0,
  }

  const gameNumber = parseInt(line.split(' ')[1].split(':')[0], 10);
  const pulls = line.split(':')[1].split(';').map((game) => game.trim())
  for (const pull of pulls) {
    const cubeTotals = {
      red: 0,
      green: 0,
      blue: 0,
    }
    // console.log('pull', pull)
    const cubes = pull.split(',');
    for (const cube of cubes) {
      const cubeTrimmed = cube.trim()
      // console.log('cube', cube)
      const number = parseInt(cubeTrimmed.split(' ')[0].trim(), 10);
      const color = cubeTrimmed.split(' ')[1].trim();
      cubeTotals[color] += number;
      // console.log(number, color)
    }
    // debugCubeTotals(cubeTotals)
    // debugCubeTotals(limits)

    if (cubeTotals['red'] > smallestLimit['red']) { smallestLimit['red'] = cubeTotals['red']; } 
    if (cubeTotals['green'] > smallestLimit['green']) { smallestLimit['green'] = cubeTotals['green']; }
    if (cubeTotals['blue'] > smallestLimit['blue']) { smallestLimit['blue'] = cubeTotals['blue']; }
  }
  // console.log(pulls)
  // console.log(validPulls)
  return smallestLimit['red'] * smallestLimit['green'] * smallestLimit['blue']
}


export function part2(filename) {
  const lines = fileParser(filename, lineParserP2);
  // console.log(lines)
  return sumNumbers(lines);
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
