// https://adventofcode.com/2023/day/5

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import fileParser, { fileParserToObject } from '../utils/file-parser.js';
import { sortNumbersAscending } from '../utils/array.js';


function mapLookup(number, map) {
  for (const mapRow of map) {
    if (number >= mapRow.srcStart && number <= mapRow.srcEnd) {
      return number - mapRow.srcStart + mapRow.destStart;
    }
  }
  return number;
}


export function part1(filename) {
  const lines = fileParser(filename);

  let seeds = [];
  const maps = {
    'seed-to-soil': [],
    'soil-to-fertilizer': [],
    'fertilizer-to-water': [],
    'water-to-light': [],
    'light-to-temperature': [],
    'temperature-to-humidity': [],
    'humidity-to-location': [],
  };

  let processingMap = false;
  let key = '';
  for (const line of lines) {
    if (line.length === 0) {
      processingMap = false;
    } else if (line.startsWith('seeds:')) {
      seeds = [...line.split(': ')[1].split(' ')];
    } else if (line.includes('map:')) {
      key = line.split(' ')[0];
      processingMap = true;
    } else if (processingMap) {
      const destStart = parseInt(line.split(' ')[0], 10);
      const srcStart =  parseInt(line.split(' ')[1], 10);
      const range =  parseInt(line.split(' ')[2], 10);
      const mapRow = {
        destStart,
        destEnd: destStart + range - 1,
        srcStart,
        srcEnd: srcStart + range - 1,
        range,
      }
      maps[key].push(mapRow)
    }
  }

  const locations = [];
  for (const seed of seeds) {
    const soil = mapLookup(parseInt(seed, 10), maps['seed-to-soil']);
    const fertilizer = mapLookup(soil, maps['soil-to-fertilizer']);
    const water = mapLookup(fertilizer, maps['fertilizer-to-water']);
    const light = mapLookup(water, maps['water-to-light']);
    const temperature = mapLookup(light, maps['light-to-temperature']);
    const humidity = mapLookup(temperature, maps['temperature-to-humidity']);
    const location = mapLookup(humidity, maps['humidity-to-location']);
    locations.push(location)
  }

  return sortNumbersAscending(locations)[0];
}

function lineParserP2(line) {
  return line;
}

export function part2(filename) {
  const lines = fileParser(filename, lineParserP2);
  return 0;
}

export function run() {
  const filename = './day-05/input.txt';
  const results = new Result('Day 05');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
