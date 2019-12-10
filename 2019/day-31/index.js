// https://adventofcode.com/2019/day/5

const fs = require("fs");
const { performance } = require("perf_hooks");

const intcode = require("./intcode.js");

let results = {
  title: "Day 05",
  part1: {
    answer: "TBD",
    time: 0
  },
  part2: {
    answer: "TBD",
    time: 0
  }
};


function part1() {
  let _memory = fs.readFileSync("./day-05/input.txt", 'utf-8');
  let result = intcode.run(_memory, 1);
  return result.split(",").pop();
}

function part2() {
  let _memory = fs.readFileSync("./day-05/input.txt", 'utf-8');
  return intcode.run(_memory, 5);
}

exports.run = function run() {
  
  let start = performance.now();
  results.part1.answer = part1();
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2();
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
};