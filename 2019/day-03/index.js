// https://adventofcode.com/2019/day/3

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

function getDistance(point1X, point1Y, point2X, point2Y) {
  return Math.abs(point2X - point1X) + Math.abs(point2Y - point1Y);
}

function initWires() {
  let wireOne = new Map();
  let wireTwo = new Map();

  let wires = fs.readFileSync("./day-03/input.txt", 'utf-8').split(require('os').EOL)
  //let wires = fs.readFileSync("./day-03/test.txt", 'utf-8').split(require('os').EOL)
  
  let move = {
    "R": {x: 1, y: 0},
    "L": {x: -1, y: 0},
    "D": {x: 0, y: 1},
    "U": {x: 0, y: -1}
  }

  let point = { x: 0, y: 0 };
  let steps = 0;

  wires[0].split(',').forEach(function(movement) {
    let direction = movement[0]
    let distance = parseInt(movement.split(direction)[1])

    for(let i = 0; i < distance; i++) {
      let newPoint = {
        x: point.x + move[direction].x,
        y: point.y += move[direction].y }

      steps += 1;
      wireOne.set(`${newPoint.x},${newPoint.y}`, steps);
      point.x = newPoint.x;
      point.y = newPoint.y;
    }
  })

  point = { x: 0, y: 0 };
  steps = 0;

  wires[1].split(',').forEach(function(movement) {
    let direction = movement[0]
    let distance = parseInt(movement.split(direction)[1])

    for(let i = 0; i < distance; i++) {
      let newPoint = {
        x: point.x + move[direction].x,
        y: point.y += move[direction].y }

      steps += 1;
      wireTwo.set(`${newPoint.x},${newPoint.y}`, steps);
      point = newPoint;
    }
  })

  return {wireOne, wireTwo};
}

function part1() {
  const {wireOne, wireTwo} = initWires();
  let _intersection = [];

  for (var key of wireOne.keys()) {
    if(wireTwo.has(key)) {
      let point = key.split(',')
      _intersection.push(getDistance(point[0], point[1], 0, 0));
    }
  }

  return Math.min(..._intersection);
}

function part2() {
  const {wireOne, wireTwo} = initWires();
  let _intersection = [];

  for (var key of wireOne.keys()) {
    if(wireTwo.has(key)) {
      _intersection.push(wireOne.get(key) + wireTwo.get(key));
    }
  }
  
  return Math.min(..._intersection);
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