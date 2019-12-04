// https://adventofcode.com/2019/day/4

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

function doubleOrMore(count) {
  return count >= 1;
}

function doubleExactly(count) {
  return count === 1;
}

function numberOfValidPasswords(doubleCheck) {

  let validPasswords = 0;

  const MIN = 108457;
  const MAX = 562041;

  for(let pass = MIN; pass <= MAX; pass++) {

    let neverDecreases = true;
    let hasDouble = false;

    let prev = -1;
    let current = -1;
    let numberCounts = new Array(10).fill(0);
    
    for (const c of pass.toString()) {
      current = parseInt(c);
      if(prev !== -1) {

        if(current < prev) {
          neverDecreases = false;
          break;
        }
        if(current === prev) {
          numberCounts[current] = numberCounts[current] + 1;
        }
      }

      prev = parseInt(current);
    }

    numberCounts.forEach(function(count) {
      if(doubleCheck(count)) {
        hasDouble = true;
      }
    })

    if(neverDecreases && hasDouble) {
      validPasswords += 1;
    }
  }

  return validPasswords;
}

function part1() {
  return numberOfValidPasswords(doubleOrMore);
}

function part2() {
  return numberOfValidPasswords(doubleExactly);
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