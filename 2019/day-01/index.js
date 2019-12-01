// https://adventofcode.com/2019/day/1

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

// Fuel is calculated by taking mass, divide it by three, rounding down, and
// subtracting 2.
function calcFuel(mass) {
  return Math.floor(mass / 3) - 2;
}

function part1() {
  return fs.readFileSync("./day-01/input.txt", 'utf-8')
    .split(require('os').EOL)
    .reduce((acc, mass) => {
      return acc + calcFuel(mass);
    }, 0);
}

function part2() {

  return fs.readFileSync("./day-01/input.txt", 'utf-8')
    .split(require('os').EOL)
    .reduce((acc, mass) => {
      do {
        mass = calcFuel(mass);

        if(mass > 0) {
          acc += mass;
        }
      } while(mass >= 0);

      return acc;
    }, 0);
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