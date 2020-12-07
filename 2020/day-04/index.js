// https://adventofcode.com/2020/day/3

const readline = require("readline");
const fs = require("fs");
const { performance } = require("perf_hooks");

let results = {
  title: "Day 04",
  part1: {
    answer: "TBD",
    time: 0
  },
  part2: {
    answer: "TBD",
    time: 0
  }
};

function isValid(passport) {

  // byr (Birth Year)
  // iyr (Issue Year)
  // eyr (Expiration Year)
  // hgt (Height)
  // hcl (Hair Color)
  // ecl (Eye Color)
  // pid (Passport ID)
  // cid (Country ID)

  const pattern = /byr:|iyr:|eyr:|hcl:|hgt:|ecl:|pid/ig
  let numMatched = 0;

  passport.replace(pattern, function(match) {
    numMatched += 1
    //console.log(match)
    return "match"
  })

  return numMatched >= 7
}


function part1() {

  //const result = fs.readFileSync("./day-04/input-test.txt", 'utf-8')
  const result = fs.readFileSync("./day-04/input.txt", 'utf-8')
    .split("\n\n")
    .reduce(function(accumulator, passport) {
      accumulator += isValid(passport) ? 1 : 0
      return accumulator
    }, 0)

  return result
}


function part2() {

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