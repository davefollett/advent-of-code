// https://adventofcode.com/2023/day/5

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import fileParser from '../utils/file-parser.js';
import { sortNumbersAscending } from '../utils/array.js';

function mapLookup(number, map) {
  for (const mapRow of map) {
    if (number >= mapRow.srcStart && number <= mapRow.srcEnd) {
      return number - mapRow.srcStart + mapRow.destStart;
    }
  }
  return number;
}

function mapLookupReverse(number, map) {
  for (const mapRow of map) {
    if (number >= mapRow.destStart && number <= mapRow.destEnd) {
      return number - mapRow.destStart + mapRow.srcStart;
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
      /* eslint-disable-next-line prefer-destructuring */
      key = line.split(' ')[0];
      processingMap = true;
    } else if (processingMap) {
      const destStart = parseInt(line.split(' ')[0], 10);
      const srcStart = parseInt(line.split(' ')[1], 10);
      const range = parseInt(line.split(' ')[2], 10);
      const mapRow = {
        destStart,
        destEnd: destStart + range - 1,
        srcStart,
        srcEnd: srcStart + range - 1,
        range,
      };
      maps[key].push(mapRow);
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
    locations.push(location);
  }

  return sortNumbersAscending(locations)[0];
}

function isValidSeed(seeds, seed) {
  for (const range of seeds) {
    if (seed >= range.start && seed <= range.end) {
      return true;
    }
  }
  return false;
}

// Didn't think reverse through the maps starting a location of zero, I had to lookup this solution.
export function part2(filename) {
  const lines = fileParser(filename);

  let seedsRanges = [];
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
      seedsRanges = line.split(': ')[1].split(' ');
    } else if (line.includes('map:')) {
      /* eslint-disable-next-line prefer-destructuring */
      key = line.split(' ')[0];
      processingMap = true;
    } else if (processingMap) {
      const destStart = parseInt(line.split(' ')[0], 10);
      const srcStart = parseInt(line.split(' ')[1], 10);
      const range = parseInt(line.split(' ')[2], 10);
      const mapRow = {
        destStart,
        destEnd: destStart + range - 1,
        srcStart,
        srcEnd: srcStart + range - 1,
        range,
      };
      maps[key].push(mapRow);
    }
  }

  const seeds = [];
  for (let i = 0; i <= seedsRanges.length - 2; i += 2) {
    const start = parseInt(seedsRanges[i], 10);
    const end = start + parseInt(seedsRanges[i + 1], 10) - 1;
    seeds.push({ start, end });
  }

  let minLocation = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < Number.MAX_SAFE_INTEGER; i += 1) {
    const humidity = mapLookupReverse(i, maps['humidity-to-location']);
    const temperature = mapLookupReverse(humidity, maps['temperature-to-humidity']);
    const light = mapLookupReverse(temperature, maps['light-to-temperature']);
    const water = mapLookupReverse(light, maps['water-to-light']);
    const fertilizer = mapLookupReverse(water, maps['fertilizer-to-water']);
    const soil = mapLookupReverse(fertilizer, maps['soil-to-fertilizer']);
    const seed = mapLookupReverse(soil, maps['seed-to-soil']);

    if (isValidSeed(seeds, seed)) {
      minLocation = i;
      break;
    }
  }

  return minLocation;
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
