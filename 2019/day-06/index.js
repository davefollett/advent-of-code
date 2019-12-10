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

function traceOrbits(orbitTree, current) {

  let orbitNames = [];

  if(orbitTree[current].parent === null) { return orbitNames; }
    
  orbitNames = traceOrbits(orbitTree, orbitTree[current].parent);
  orbitNames.push(current);
  return orbitNames;
}

function countOrbits(stopKey, orbitTree, current) {

  let result = 0;

  if(current === stopKey) { return result; }

  return countOrbits(stopKey, orbitTree, orbitTree[current].parent) + 1;
}

function initOrbitTree(input) {
  orbitTree = {
    "COM": {
      parent: null,
    }
  };

  input.split(require('os').EOL).forEach(line => {
    const [parent, child] = line.split(")");
    orbitTree[child] = {parent: parent};
  });

  return orbitTree;
}

function part1(input) {

  let result = 0;
  let orbitTree = initOrbitTree(input);

  for (let key in orbitTree) {
    result += countOrbits("COM", orbitTree, key);
  }

  return result;
}
exports.part1 = part1;

function part2(input) {

  let result = 0;
  let orbitTree = initOrbitTree(input);
  let youOrbits = traceOrbits(orbitTree, "YOU");
  let sanOrbits = traceOrbits(orbitTree, "SAN");

  let matchingOrbit = youOrbits.reduce((match, orbit) => {
    return sanOrbits.includes(orbit) ? orbit : match;
  });

  result = countOrbits(matchingOrbit, orbitTree, "YOU")
    + countOrbits(matchingOrbit, orbitTree, "SAN");

  return result - 2;
}
exports.part2 = part2;

exports.run = function run() {
  
  let start = performance.now();
  let input = fs.readFileSync("./day-06/input.txt", 'utf-8');
  results.part1.answer = part1(input);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  input = fs.readFileSync("./day-06/input.txt", 'utf-8');
  results.part2.answer = part2(input);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
};