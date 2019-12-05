// https://adventofcode.com/2019/day/4

const { performance } = require("perf_hooks");

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
  return 0;
}

function part2() {
  return 0;
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