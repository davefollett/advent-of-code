// https://adventofcode.com/2022/day/1

const readline = require("readline");
const fs = require("fs");
const { performance } = require("perf_hooks");

let results = {
  title: "Day 01",
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

  let result = 0
  
  return result
}

function part2() {
  let result = 0

  return result
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