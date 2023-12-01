// https://adventofcode.com/2023/day/1

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import fileParser from '../utils/file-parser.js';
import { sumNumbers } from '../utils/array.js';

function lineParserP1(line) {
  const numbers = line.replaceAll(/[a-zA-z]/gi, '')
  return parseInt(`${numbers.at(0)}${numbers.at(-1)}`, 10)
}

function replaceWordNumber(line, number) {
  switch (number) {
    case "one":
      line = line.replace(/one/i, '1');
      break;
    case "two":
      line = line.replace(/two/i, '2');
      break;
    case "three":
      line = line.replace(/three/i, '3');
      break;
    case "four":
      line = line.replace(/four/i, '4');
      break;
    case "five":
      line = line.replace(/five/i, '5');
      break;
    case "six":
      line = line.replace(/six/i, '6');
      break;
    case "seven":
      line = line.replace(/seven/i, '7');
      break;
    case "eight":
      line = line.replace(/eight/i, '8');
      break;
    case "nine":
      line = line.replace(/nine/i, '9');
      break;
  }
  return line;
}

function wordToDigit(number) {
  const mapping = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9"
  }
  return mapping[number]
}


function lineParserP2(line) {

  let firstNumber = line.match(/one|two|three|four|five|six|seven|eight|nine|1|2|3|4|5|6|7|8|9/gi)[0]
  if(firstNumber.length > 1) {
    firstNumber = wordToDigit(firstNumber)
  }
  const reversedLine = line.split("").reverse().join("")
  let lastNumber = reversedLine.match(/eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|1|2|3|4|5|6|7|8|9/gi)[0]
  // console.log(firstNumber, lastNumber)
  if(lastNumber.length > 1) {
    lastNumber = wordToDigit(lastNumber.split("").reverse().join(""))
  }
  console.log(firstNumber, lastNumber)

  // let numbers = line.match(/(?=one)(?=two)(?=three)/g)
  return parseInt(`${firstNumber}${lastNumber}`, 10)
  // console.log(numbers)
  // if(numbers) {
  //   line = replaceWordNumber(line, numbers[0])
  //   line = replaceWordNumber(line, numbers[numbers.length -1])
  // }
  // line = line.replaceAll(/[a-zA-z]/gi, '')
  // return parseInt(`${line.at(0)}${line.at(-1)}`, 10)
}


export function part1(filename) {
  const lines = fileParser(filename, lineParserP1);
  // console.log(lines)
  return sumNumbers(lines)
}

export function part2(filename) {
  const lines = fileParser(filename, lineParserP2);
  // for (const line of lines) {
  //   console.log(line)
  // }
  console.log(lines)
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
