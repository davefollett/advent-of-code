// https://adventofcode.com/2019/day/6

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

function countOrbits(orbitTree, current) {

  let result = 0;

  if(current.parent === null) { return result; }

  return countOrbits(orbitTree, orbitTree[current.parent]) + 1;
}

function part1(input) {

  let result = 0;

  orbitTree = {
    "COM": {
      parent: null,
    }
  };

  input.split(require('os').EOL).forEach(line => {
    const [parent, child] = line.split(")");
    orbitTree[child] = {parent: parent};
  });

  //console.log(orbitTree);

  for (let key in orbitTree) {
    result += countOrbits(orbitTree, orbitTree[key]);
  }

  return result;
}
exports.part1 = part1;

function part2() {
  return 0;
}

exports.run = function run() {
  
  let start = performance.now();
  
  let input = fs.readFileSync("./day-06/test.txt", 'utf-8');
  results.part1.answer = part1(input);

  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2();
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
};