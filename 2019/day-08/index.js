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

function initImage(width, height) {
  let image = new Array(height);
  for(let i = 0; i < image.length; i++) {
    image[i] = new Array(width).fill(-1);
  }
  return {width: width, height: height, render: image};
}

function printImage(image) {
  const width = image.width;
  const height = image.height;
  const render = image.render;

  process.stdout.write("\n---START--IMAGE---\n");
  for(let y = 0; y < height; y++) {
    process.stdout.write(render[y] + '\n');
  }
  process.stdout.write("\x1b[0m---END--IMAGE---\n");
}

function addLayer(image, layer) {
  const width = image.width;
  const height = image.height;
  const render = image.render;
  const BgBlack = "\x1b[40m"
  const BgWhite = "\x1b[47m"
  color = {0: BgBlack, 1: BgWhite};

  for(let i = 0; i < height; i++) {
    row = layer.splice(0, width);
    for(let k = 0; k < width; k++) {
      if(row[k] !== '2') {
        render[i][k] = color[row[k]];
      }
    }
  }

  return image;
}

function part2(input, width, height) {

  let image = initImage(width, height);
  let layers = decodeLayers(input, width, height);

  while(layers.length !== 0){
    image = addLayer(image, layers.pop());
  }

  printImage(image);
}
exports.part2 = part2;

exports.run = function run() {
  
  let start = performance.now();
  let input = fs.readFileSync("./day-08/input.txt", 'utf-8');
  results.part1.answer = part1(input, 25, 6);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  input = fs.readFileSync("./day-08/input.txt", 'utf-8');
  part2(input, 25, 6);
  results.part2.answer = "CJZHR (in console)";
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}