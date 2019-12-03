// https://adventofcode.com/2019/day/2

const readline = require("readline");
const fs = require("fs");
const { performance } = require("perf_hooks");

let results = {
  title: "Day 02",
  part1: {
    answer: "TBD",
    time: 0
  },
  part2: {
    answer: "TBD",
    time: 0
  }
};

const HALT = 99;
const ADD = 1;
const MULTIPLY = 2;

function initProgram(noun, verb) {
  let program = fs.readFileSync("./day-02/input.txt", 'utf-8').split(',');
  //let program = fs.readFileSync("./day-02/test.txt", 'utf-8').split(',');
  program[1] = noun;
  program[2] = verb;
  return program;
}

function incrementIndex(index) {
  return index += 4;
}

function getOpcode(program, index) {
  return parseInt(program[index]);
}

function getValueOne(program, index) {
  return parseInt(program[program[index + 1]]);
}

function getValueTwo(program, index) {
  return parseInt(program[program[index + 2]]);
}

function getPosition(program, index) {
  return parseInt(program[index + 3]);
}

function part1(noun, verb) {
  
  program = initProgram(noun, verb);

  let index = 0;
  let opcode = getOpcode(program, index);
  let valueOne = getValueOne(program, index);
  let valueTwo = getValueTwo(program, index);
  let position = getPosition(program, index);

  while(opcode !== HALT) {

    if(opcode === ADD) {
      program[position] = valueOne + valueTwo;
    } else if( opcode === MULTIPLY) {
      program[position] = valueOne * valueTwo;
    } else {
      console.error("opcode error")
      break;
    }

    index = incrementIndex(index);
    opcode = getOpcode(program, index);
    valueOne = getValueOne(program, index);
    valueTwo = getValueTwo(program, index);
    position = getPosition(program, index);
  }

  return program[0];
}

function part2() {

  for(let noun = 0; noun <= 99; noun++) {
    for(let verb = 0; verb <= 99; verb++) {
      if(part1(noun,verb) === 19690720 ) {
        return (100 * noun) + verb;
      }
    }
  }

  return 0;
}

exports.run = function run() {
  let start = performance.now();
  results.part1.answer = part1(12, 2);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2();
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
};