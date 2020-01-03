// https://adventofcode.com/2019/day/5

const fs = require("fs");
const { performance } = require("perf_hooks");

const intcode = require("./intcode.js");

let results = {
  title: "Day 07",
  part1: {
    answer: "TBD",
    time: 0
  },
  part2: {
    answer: "TBD",
    time: 0
  }
};


let sequence = [
  [0, 1, 2, 3, 4],
  [0, 1, 2, 4, 3],
  [0, 1, 3, 2, 4],
  [0, 1, 3, 4, 2],
  [0, 1, 4, 2, 3],
  [0, 1, 4, 3, 2],
  [0, 2, 1, 3, 4],
  [0, 2, 1, 4, 3],
  [0, 2, 3, 1, 4],
  [0, 2, 3, 4, 1],
  [0, 2, 4, 1, 3],
  [0, 2, 4, 3, 1],
  [0, 3, 1, 2, 4],
  [0, 3, 1, 4, 2],
  [0, 3, 2, 1, 4],
  [0, 3, 2, 4, 1],
  [0, 3, 4, 1, 2],
  [0, 3, 4, 2, 1],
  [0, 4, 1, 2, 3],
  [0, 4, 1, 3, 2],
  [0, 4, 2, 1, 3],
  [0, 4, 2, 3, 1],
  [0, 4, 3, 1, 2],
  [0, 4, 3, 2, 1],
  [1, 0, 2, 3, 4],
  [1, 0, 2, 4, 3],
  [1, 0, 3, 2, 4],
  [1, 0, 3, 4, 2],
  [1, 0, 4, 2, 3],
  [1, 0, 4, 3, 2],
  [1, 2, 0, 3, 4],
  [1, 2, 0, 4, 3],                                                                                                                                                                      
  [1, 2, 3, 0, 4],                                                                                                                                                                      
  [1, 2, 3, 4, 0],                                                                                                                                                                      
  [1, 2, 4, 0, 3],                                                                                                                                                                      
  [1, 2, 4, 3, 0],                                                                                                                                                                      
  [1, 3, 0, 2, 4],                                                                                                                                                                      
  [1, 3, 0, 4, 2],                                                                                                                                                                      
  [1, 3, 2, 0, 4],                                                                                                                                                                      
  [1, 3, 2, 4, 0],
  [1, 3, 4, 0, 2],
  [1, 3, 4, 2, 0],
  [1, 4, 0, 2, 3],
  [1, 4, 0, 3, 2],
  [1, 4, 2, 0, 3],
  [1, 4, 2, 3, 0],
  [1, 4, 3, 0, 2],
  [1, 4, 3, 2, 0],
  [2, 0, 1, 3, 4],
  [2, 0, 1, 4, 3],
  [2, 0, 3, 1, 4],
  [2, 0, 3, 4, 1],
  [2, 0, 4, 1, 3],
  [2, 0, 4, 3, 1],
  [2, 1, 0, 3, 4],
  [2, 1, 0, 4, 3],
  [2, 1, 3, 0, 4],
  [2, 1, 3, 4, 0],
  [2, 1, 4, 0, 3],
  [2, 1, 4, 3, 0],
  [2, 3, 0, 1, 4],
  [2, 3, 0, 4, 1],
  [2, 3, 1, 0, 4],
  [2, 3, 1, 4, 0],
  [2, 3, 4, 0, 1],
  [2, 3, 4, 1, 0],
  [2, 4, 0, 1, 3],
  [2, 4, 0, 3, 1],
  [2, 4, 1, 0, 3],
  [2, 4, 1, 3, 0],
  [2, 4, 3, 0, 1],
  [2, 4, 3, 1, 0],
  [3, 0, 1, 2, 4],
  [3, 0, 1, 4, 2],
  [3, 0, 2, 1, 4],
  [3, 0, 2, 4, 1],
  [3, 0, 4, 1, 2],
  [3, 0, 4, 2, 1],
  [3, 1, 0, 2, 4],
  [3, 1, 0, 4, 2],
  [3, 1, 2, 0, 4],
  [3, 1, 2, 4, 0],
  [3, 1, 4, 0, 2],
  [3, 1, 4, 2, 0],
  [3, 2, 0, 1, 4],
  [3, 2, 0, 4, 1],
  [3, 2, 1, 0, 4],
  [3, 2, 1, 4, 0],
  [3, 2, 4, 0, 1],
  [3, 2, 4, 1, 0],
  [3, 4, 0, 1, 2],
  [3, 4, 0, 2, 1],
  [3, 4, 1, 0, 2],
  [3, 4, 1, 2, 0],
  [3, 4, 2, 0, 1],
  [3, 4, 2, 1, 0],
  [4, 0, 1, 2, 3],
  [4, 0, 1, 3, 2],
  [4, 0, 2, 1, 3],
  [4, 0, 2, 3, 1],
  [4, 0, 3, 1, 2],
  [4, 0, 3, 2, 1],
  [4, 1, 0, 2, 3],
  [4, 1, 0, 3, 2],
  [4, 1, 2, 0, 3],
  [4, 1, 2, 3, 0],
  [4, 1, 3, 0, 2],
  [4, 1, 3, 2, 0],
  [4, 2, 0, 1, 3],
  [4, 2, 0, 3, 1],
  [4, 2, 1, 0, 3],
  [4, 2, 1, 3, 0],
  [4, 2, 3, 0, 1],
  [4, 2, 3, 1, 0],
  [4, 3, 0, 1, 2],
  [4, 3, 0, 2, 1],
  [4, 3, 1, 0, 2],
  [4, 3, 1, 2, 0],
  [4, 3, 2, 0, 1],
  [4, 3, 2, 1, 0],
];



function part1() {
  let _memory = fs.readFileSync("./day-07/input.txt", 'utf-8');
  let signals = [];

  sequence.forEach(element => {
    let outputA = parseInt(intcode.run(_memory, [element[0], 0]));
    let outputB = parseInt(intcode.run(_memory, [element[1], outputA]));
    let outputC = parseInt(intcode.run(_memory, [element[2], outputB]));
    let outputD = parseInt(intcode.run(_memory, [element[3], outputC]));
    let outputE = parseInt(intcode.run(_memory, [element[4], outputD]));
    signals.push(outputE);
  });

  return Math.max(...signals)
}

// function part2() {
//   let _memory = fs.readFileSync("./day-05/input.txt", 'utf-8');
//   return intcode.run(_memory, 5);
// }

exports.run = function run() {
  
  let start = performance.now();
  results.part1.answer = part1();
  results.part1.time = (performance.now() - start).toFixed(2);

  // start = performance.now();
  // results.part2.answer = part2();
  // results.part2.time = (performance.now() - start).toFixed(2);

  return results;
};