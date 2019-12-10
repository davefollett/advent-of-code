// https://adventofcode.com/2019/day/6

const fs = require("fs");
const { performance } = require("perf_hooks");

let results = {
  title: "Day 08",
  part1: {
    answer: "TBD",
    time: 0
  },
  part2: {
    answer: "TBD",
    time: 0
  }
};

function decodeLayers(input, width, height) {
  let area = width * height;
  let layers = [];
  let inputArray = input.split('');

  while(inputArray.length >= area) {
    layers.push(inputArray.splice(0,area))
  }
  return layers;
}
exports.decodeLayers = decodeLayers;

function sumPixels(layers) {
  return layers.map(layer => {
    return layer.reduce(function(obj, item) {
      if (!obj[item]) {
        obj[item] = 0;
      }
      obj[item]++;
      return obj;
    }, {});
  })
}
exports.sumPixels = sumPixels;


function part1(input, width, height) {

  let layers = decodeLayers(input, width, height);
  let pixelSums = sumPixels(layers);
  
  pixelSums.sort((a,b) => {
    return a[0] - b[0];
  });

  //console.log(pixelSums)

  let minZeroLayer = pixelSums[0];

  return minZeroLayer[1] * minZeroLayer[2];
}
exports.part1 = part1;

function part2(input) {

  let result = 0;
  return result;
}
exports.part2 = part2;

exports.run = function run() {
  
  let start = performance.now();
  let input = fs.readFileSync("./day-08/input.txt", 'utf-8');
  results.part1.answer = part1(input, 25, 6);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  input = fs.readFileSync("./day-08/input.txt", 'utf-8');
  results.part2.answer = part2(input);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
};