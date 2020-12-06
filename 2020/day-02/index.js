// https://adventofcode.com/2020/day/2

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

function parseLine(line) {

  const password = {
    min: 0,
    max: 0,
    indexOne: 0,
    indexTwo: 0,
    letter: "",
    password: ""
  }

  const re = /([0-9]*)-([0-9]*) ([a-z]): (.*)/

  const tokens = line.match(re);

  password.min = parseInt(tokens[1])
  password.max = parseInt(tokens[2])
  password.indexOne = parseInt(tokens[1]) - 1
  password.indexTwo = parseInt(tokens[2]) - 1
  password.letter = tokens[3]
  password.password = tokens[4]

  return password
}


function part1() {

  let result = 0

  //const passwords = fs.readFileSync("./day-02/test-input-1.txt", 'utf-8')
   const passwords = fs.readFileSync("./day-02/input.txt", 'utf-8')
    .split(require('os').EOL)
    .map(line => {
      return parseLine(line)
    })

  passwords.forEach(function(item) {
    let count = 0

    for(let char in item.password) {
      if(item.password[char] === item.letter) {
        count += 1
      }
    }
    if(count >= item.min && count <= item.max) {
      result +=1
    }
  })
  
  return result
}

function part2() {
  let result = 0

  // const passwords = fs.readFileSync("./day-02/test-input-1.txt", 'utf-8')
  const passwords = fs.readFileSync("./day-02/input.txt", 'utf-8')
    .split(require('os').EOL)
    .map(line => {
      return parseLine(line)
    })

  passwords.forEach(function(item) {

    if(item.password[item.indexOne] === item.letter && item.password[item.indexTwo] !== item.letter) {
      result += 1
    } else if(item.password[item.indexOne] !== item.letter && item.password[item.indexTwo] === item.letter) {
      result += 1
    }
  })
  
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