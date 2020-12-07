// https://adventofcode.com/2020/day/3

const readline = require("readline");
const fs = require("fs");
const { performance } = require("perf_hooks");

let results = {
  title: "Day 06",
  part1: {
    answer: "TBD",
    time: 0
  },
  part2: {
    answer: "TBD",
    time: 0
  }
};


function part1(input) {

  const result = fs.readFileSync(input, 'utf-8')
    .split("\n\n")
    .reduce(function(accumulator, answers) {
      accumulator += new Set(answers.replace(/\n/g, '').split('')).size
      return accumulator
    }, 0)

  return result
}
exports.part1 = part1


function part2(input) {

  const result = fs.readFileSync(input, 'utf-8')
    .split("\n\n")
    .reduce(function(accumulator, answers) {

      let answersArray = answers.split('\n')
      let numPeople = answersArray.length

      let answersCombined = {}
      
      answersArray.forEach(function(person) {
        for(let i in person) {
          if(answersCombined[person[i]]) {
            answersCombined[person[i]] += 1
          } else {
            answersCombined[person[i]] = 1
          }
        }
      })

      for(let attribute in answersCombined) {
        accumulator += (answersCombined[attribute] === numPeople) ? 1 : 0
      }
      
      return accumulator
    }, 0)

  return result
}
exports.part2 = part2

exports.run = function run() {

  const input = "./day-06/input.txt"
  //const input = "./day-06/input-test.txt"

  let start = performance.now();
  results.part1.answer = part1(input);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(input);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
};