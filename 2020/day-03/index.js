// https://adventofcode.com/2020/day/3

const readline = require("readline");
const fs = require("fs");
const { performance } = require("perf_hooks");

let results = {
  title: "Day 03",
  part1: {
    answer: "TBD",
    time: 0
  },
  part2: {
    answer: "TBD",
    time: 0
  }
};


function checkHill(hill, right, down) {
  let result = 0
  const size = hill[0].length

  let col = 0
  for(let row = 0; row < hill.length; row += down) {
    if(hill[row][col] === '#') {
      result += 1
    }
    col = (col + right) % size
  }
  return result
}


function part1() {

  let result = 0

  // const hill = fs.readFileSync("./day-03/input-test.txt", 'utf-8')
  const hill = fs.readFileSync("./day-03/input.txt", 'utf-8')
    .split(require('os').EOL)
  
  return checkHill(hill, 3, 1)
}


function part2() {
  let result = 0

  // const hill = fs.readFileSync("./day-03/input-test.txt", 'utf-8')
  const hill = fs.readFileSync("./day-03/input.txt", 'utf-8')
    .split(require('os').EOL)

  result = checkHill(hill, 1, 1)
    * checkHill(hill, 3, 1)
    * checkHill(hill, 5, 1)
    * checkHill(hill, 7, 1)
    * checkHill(hill, 1, 2)
  
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