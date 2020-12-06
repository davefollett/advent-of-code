// https://adventofcode.com/2020/day/1

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

  const expenses = fs.readFileSync("./day-01/input.txt", 'utf-8')
    .split(require('os').EOL)
    .map(element => {
      return parseInt(element)
    })
  
  // O(n^2) yuck
  for(let i = 0; i < expenses.length - 1; i++) {
    for(let j = 1; j < expenses.length; j++) {
      if( expenses[i] + expenses[j] === 2020) {
        return expenses[i] * expenses[j]
      }
    }
  }
  
  return result
}

function part2() {
  let result = 0

  const expenses = fs.readFileSync("./day-01/input.txt", 'utf-8')
    .split(require('os').EOL)
    .map(element => {
      return parseInt(element)
    })
  
  // O(n^3) yuck
  for(let i = 0; i < expenses.length - 2; i++) {
    for(let j = 1; j < expenses.length - 1; j++) {
      for(let k = 2; k < expenses.length; k++) {
        if( expenses[i] + expenses[j] + expenses[k] === 2020) {
          return expenses[i] * expenses[j] * expenses[k]
        }
      }
    }
  }
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