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

let wireOne = [];
let wireTwo = [];
let wireCross = [];


function getDistance(point1X, point1Y, point2X, point2Y) {
  const result = Math.abs(point2X - point1X) + Math.abs(point2Y - point1Y);
  //console.log(result);
  return result;
}

function goRight(point, distance, wire) {
  //console.log(`go right ${distance}`)

  for(let i = 1; i <= distance; i++) {
    wire.push({ x: point.x + i, y: point.y, steps: point.steps + i })
  }
}

function goUp(point, distance, wire) {
  //console.log(`go up ${distance}`)

  for(let i = 1; i <= distance; i++) {
    wire.push({ x: point.x, y: point.y - i, steps: point.steps + i })
  }

}

function goLeft(point, distance, wire) {
  //console.log(`go left ${distance}`)

  for(let i = 1; i <= distance; i++) {
    wire.push({ x: point.x - i, y: point.y, steps: point.steps + i })
  }
}

function goDown(point, distance, wire) {
  //console.log(`go down ${distance}`)

  for(let i = 1; i <= distance; i++) {
    wire.push({ x: point.x, y: point.y + i, steps: point.steps + i })
  }
}

function traceWire(path, wire) {
  let point = { x: 0, y: 0, steps: 0 };

  path.split(',').forEach(function(path) {
    //console.log(path)
    let direction = path[0]
    let distance = parseInt(path.split(direction)[1])

    if(direction === "R") {

      goRight(point, distance, wire)
    } else if(direction === "L") {

      goLeft(point, distance, wire)
    } else if(direction === "U") {

      goUp(point, distance, wire)
    } else if(direction === "D") {

      goDown(point, distance, wire)
    }

    point = wire[wire.length - 1]
    //console.log(wire)
  })
}

function initWires() {
  let wires = fs.readFileSync("./day-03/input.txt", 'utf-8').split(require('os').EOL)
  //let wires = fs.readFileSync("./day-03/test.txt", 'utf-8').split(require('os').EOL)
  
  //let point = { x: 0, y: 0 };

  traceWire(wires[0], wireOne)
  traceWire(wires[1], wireTwo)

  //console.log(wires[0])
 // console.log(wireOne)
  //return program;
}

// function findCrosses() {
//   wireOne.forEach(function(one) {
//     let result = wireTwo.find(function(two) {
//       return (one.x === two.x) && (one.y === two.y)
//     });
//     if(result !== undefined) {
//       wireCross.push(result)
//     }
//   })
// }

function part1() {
  initWires();
  // findCrosses();
  wireOne.forEach(function(one) {
    let result = wireTwo.find(function(two) {
      return (one.x === two.x) && (one.y === two.y)
    });
    if(result !== undefined) {
      wireCross.push(result)
    }
  })

  //console.log(wireCross)

  let answer = wireCross.reduce((shortest, point) => {
    let distance = getDistance(point.x, point.y, 0, 0);
    if(distance < shortest) {
      shortest = distance;
    }
    return shortest;
  }, 100000000);


  return answer;
}

function part2() {
  initWires();
//console.log(wireOne)
  let crossSteps = []

  wireOne.forEach(function(one) {
    let result = wireTwo.findIndex(function(two) {
      
      return (one.x === two.x) && (one.y === two.y)
    });
    if(result !== -1) {
      crossSteps.push(one.steps + wireTwo[result].steps)
    }
  })
  
  //console.log(crossSteps)

  let answer = crossSteps.reduce((shortest, steps) => {
    
    if(steps < shortest) {
      shortest = steps;
    }
    return shortest;
  }, 100000000);

  return answer;
}

exports.run = function run() {
  //let start = performance.now();
  //results.part1.answer = part1();
  //results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2();
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
};