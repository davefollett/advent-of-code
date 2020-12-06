// https://adventofcode.com/2020/day/3

const readline = require("readline");
const fs = require("fs");
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


function getLocation(min, max, adjuster, lower, code) {
  const divisor = 2
  adjuster = adjuster / divisor

  //console.log(code)

  for(let i in code) {
    if(code[i] === lower) {
      max -= adjuster
    } else {
      min += adjuster
    }
    adjuster = adjuster / divisor
  }

  //console.log(`${min} ${max}`)
  return min
}

function getColumn(pass) {
  return getLocation(0, 7, 8, "L", pass.substring(7,10))
}

function getRow(pass) {
  return getLocation(0, 127, 128, "F", pass.substring(0,7))
}


function part1() {

  // const maxSeatID = fs.readFileSync("./day-05/input-test.txt", 'utf-8')
  const maxSeatID = fs.readFileSync("./day-05/input.txt", 'utf-8')
    .split(require('os').EOL)
    .reduce(function(accumulator, currentValue) {
      const seatID = getRow(currentValue) * 8 + getColumn(currentValue)
      return seatID > accumulator ? seatID : accumulator
    }, 0)

  return maxSeatID
}


function part2() {

  const seatIDs = fs.readFileSync("./day-05/input.txt", 'utf-8')
    .split(require('os').EOL)
    .map(function(currentValue) {
      return getRow(currentValue) * 8 + getColumn(currentValue)
    })

  seatIDs.sort(function(a,b) {
    return a - b
  })

  for(let i = 0; i < seatIDs.length; i++) {
    if(seatIDs[i] + 1 !== seatIDs[i+1]) {
      return seatIDs[i] + 1
    }
  }

  return 0
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